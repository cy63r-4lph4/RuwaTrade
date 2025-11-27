<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $otpCode;
    public int $expiresMinutes;

    public function __construct(string $otpCode, int $expiresMinutes)
    {
        $this->otpCode = $otpCode;
        $this->expiresMinutes = $expiresMinutes;
    }

    public function build()
    {
        return $this->subject('Your RuwaTrade Verification Code')
                    ->view('emails.otp-html'); 
}
}