<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Models\TemplateImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class TemplateController extends Controller
{


    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $templates = Template::with('images')->paginate($perPage);

        $templates->transform(function ($template) {
            $template->thumbnail = asset('storage/' . $template->thumbnail);

            if ($template->images) {
                $template->images->transform(function ($img) {
                    $img->path = asset('storage/' . $img->path);
                    return $img;
                });
            }
            // Transform images
            $template->images->transform(function ($img) {
                return [
                    'id' => $img->id,
                    'url' => asset('storage/' . $img->thumbnail),   // Absolute URL
                    'path' => $img->path,                // Relative path for updates
                ];
            });

            return $template;
        });

        return response()->json($templates);
    }



    public function fetch()
    {

        $templates = Template::with(['images'])->select('id', 'title', 'category', 'price', 'thumbnail')

            ->get();

        $templates->transform(function ($template) {
            $template->thumbnail = asset('storage/' . $template->thumbnail);

            if ($template->images) {
                $template->images->transform(function ($img) {
                    $img->path = asset('storage/' . $img->path);
                    return $img;
                });
            }

            return $template;
        });


        return $templates;
    }
    public function fetchById($id)
    {
        $template = Template::with('images')
            ->select('id', 'title', 'category', 'price', 'thumbnail', 'description')
            ->find($id);

        if (!$template) {
            return response()->json(['message' => 'Template not found'], 404);
        }

        // Format the thumbnail path
        $template->thumbnail = asset('storage/' . $template->thumbnail);

        // Format image paths
        if ($template->images) {
            $template->images->transform(function ($img) {
                $img->path = asset('storage/' . $img->path);
                return $img;
            });
        }

        return response()->json($template);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
            'file' => 'nullable|file|max:10240',
            'images' => 'nullable|array',
            'images.*' => 'nullable|file|image|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $template = new Template($request->only([
            'title',
            'category',
            'price',
            'description'
        ]));

        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
            $template->thumbnail = $thumbnailPath;
        }

        if ($request->hasFile('file')) {
            $template->file_path = $request->file('file')->store('templates');
        }

        $template->save();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('template_images', 'public');
                $template->images()->create(['path' => $imagePath]);
            }
        }

        return response()->json([
            'message' => 'Template created successfully',
            'template' => $template->load('images')
        ]);
    }




    public function update(Request $request, $id)
    {
        $template = Template::with('images')->find($id);

        if (!$template) {
            return response()->json(['error' => 'Template not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'thumbnail' => 'required',
            'file' => 'nullable|file|max:10240',
            'images' => 'nullable|array',
            'images.*' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $template->fill($request->only([
            'title',
            'category',
            'price',
            'description'
        ]));

        // Handle file
        if ($request->hasFile('file')) {
            if ($template->file_path) {
                Storage::delete($template->file_path);
            }
            $template->file_path = $request->file('file')->store('templates');
        }

        // Handle thumbnail (string or file)
        $thumbnailInput = $request->input('thumbnail');
        if (is_string($thumbnailInput)) {
            $thumbnailPath = self::stripStorageUrl($thumbnailInput);
            $template->thumbnail = $thumbnailPath;
        } elseif ($request->hasFile('thumbnail')) {
            if ($template->thumbnail && !$template->images->contains('path', $template->thumbnail)) {
                Storage::disk('public')->delete($template->thumbnail);
            }
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
            $template->thumbnail = $thumbnailPath;
        }

        $template->save();

        // Handle images
        if ($request->has('imageOrder')) {
            $existingImagePaths = $template->images->pluck('path')->toArray();
            $newPaths = [];

            // Clear old images (fully replacing them)
            $template->images()->delete();

            $orderedInputs = $request->input('imageOrder', []);
            $uploadedFiles = $request->file('images') ?? [];
            $usedUploads = [];

            $thumbnailPathRaw = self::stripStorageUrl($template->thumbnail);

            foreach ($orderedInputs as $index => $entry) {
                // Existing image URL
                if (Str::startsWith($entry, asset('storage') . '/')) {
                    $path = self::stripStorageUrl($entry);

                    // 🛑 Skip if this image is now the thumbnail
                    if ($path === $thumbnailPathRaw) {
                        continue;
                    }

                    $template->images()->create(['path' => $path]);
                    $newPaths[] = $path;
                }

                // Uploaded image blob (match by order)
                elseif (Str::startsWith($entry, 'blob:')) {
                    foreach ($uploadedFiles as $uploadIndex => $file) {
                        if (!in_array($uploadIndex, $usedUploads) && $file instanceof \Illuminate\Http\UploadedFile) {
                            $path = $file->store('template_images', 'public');

                            // 🛑 Skip if this file was saved as the thumbnail
                            if ($path === $thumbnailPathRaw) {
                                continue;
                            }

                            $template->images()->create(['path' => $path]);
                            $newPaths[] = $path;
                            $usedUploads[] = $uploadIndex;
                            break;
                        }
                    }
                }
            }

            // Cleanup: Delete old files not reused and not set as thumbnail
            foreach ($existingImagePaths as $oldPath) {
                if (!in_array($oldPath, $newPaths) && $oldPath !== $thumbnailPathRaw) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
        }

        // Return with absolute/public URLs
        $template->thumbnail = asset('storage/' . $template->thumbnail);
        $template->images->transform(function ($img) {
            $img->path = asset('storage/' . $img->path);
            return $img;
        });

        return response()->json([
            'message' => 'Template updated successfully',
            'template' => $template->load('images')
        ]);
    }

    /**
     * Strip absolute storage URL back to relative path
     */
    private static function stripStorageUrl($url): string
    {
        $prefix = asset('storage') . '/';
        return Str::startsWith($url, $prefix) ? Str::after($url, $prefix) : $url;
    }



    public function destroy($id)
    {
        $template = Template::with('images')->find($id);

        if (!$template) {
            return response()->json(['error' => 'Template not found'], 404);
        }

        // Delete associated images
        foreach ($template->images as $image) {
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }

        // Delete file
        if ($template->file_path) {
            Storage::delete($template->file_path);
        }

        $template->delete();

        return response()->json(['message' => 'Template deleted successfully']);
    }
}
