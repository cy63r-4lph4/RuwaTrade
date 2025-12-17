<?php

// app/Configs/otp.php
return [
    'email_verification' => [
        'expires' => 10,
        'cooldown' => 2,
        'mark_verified' => true,
        'issue_token' => true,
    ],

    'password_reset' => [
        'expires' => 5,
        'cooldown' => 1,
        'mark_verified' => false,
        'issue_token' => false,
    ],
];
