<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = ['title', 'category', 'description', 'price', 'thumbnail', 'file_path'];

    public function customers()
    {
        return $this->belongsToMany(Customer::class)->withTimestamps()->withPivot('expires_at');
    }
    public function images()
    {
        return $this->hasMany(TemplateImage::class);
    }
    // app/Models/Template.php



}

