<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Log;

class CustomerTemplateController extends Controller
{
    public function index(Request $request)
    {
        $customer = $request->user();

        $templates = $customer->templates()
            ->wherePivot('expires_at', '>', now())
            ->get()
            ->map(function ($template) {
                return [
                    'id' => $template->id,
                    'title' => $template->title,
                    'category' => $template->category,
                    'thumbnail' => asset('storage/'.$template->thumbnail), // full URL
                    'file' => asset('storage/'.$template->file_path),     // full file URL
                    'expires_at' => $template->pivot->expires_at,
                ];
            });

        return response()->json($templates);
    }

    public function download($templateId)
    {
        $customer = auth('sanctum')->user();

        $template = $customer->templates()
            ->wherePivot('expires_at', '>', now())
            ->findOrFail($templateId);

        $path = $template->file_path;

        if (! Storage::disk('private')->exists($path)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        $extension = pathinfo($path, PATHINFO_EXTENSION);

        $slugifiedTitle = Str::slug($template->title);

        $downloadName = "{$slugifiedTitle}.{$extension}";

        $mimeType = Storage::disk('private')->mimeType($path);

        Log::info('Serving file for download', [
            'template_id' => $templateId,
            'path' => $path,
            'mime_type' => $mimeType,
            'download_name' => $downloadName,
            'full_path' => Storage::disk('private')->path($path),
            'size' => Storage::disk('private')->size($path),
        ]);

        return Storage::disk('private')->download($path, $downloadName, [
            'Content-Type' => $mimeType,
        ]);
    }
}
