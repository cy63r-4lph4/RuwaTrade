<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
       Schema::create('otps', function (Blueprint $table) {
    $table->id();
    $table->uuid('user_uuid');
    $table->string('otp_code', 6);
    $table->enum('type', ['email_verification']);
    $table->boolean('used')->default(false);
    $table->timestamp('expires_at');
    $table->timestamps();

    $table->foreign('user_uuid')->references('uuid')->on('users')->onDelete('cascade');
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('otps');
    }
};
