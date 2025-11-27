@component('mail::message')
# 🔐 Your Verification Code

Hey there,

Your **RuwaTrade** verification code is:

@component('mail::panel')
# {{ $otpCode }}
@endcomponent

This code expires in **{{ $expiresMinutes }} minutes**, so don’t keep it waiting.

If you didn't request this, feel free to ignore it — your account stays safe.

Thanks for being part of the RuwaTrade family.
We're building something massive. 🚀

@component('mail::subcopy')
If you're having trouble entering the code, try copying and pasting it directly into the fields.
@endcomponent
@endcomponent