<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $this->user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ];
    }

    // public function messages(): array
    // {
    //     return [
    //         'name.required' => 'Name is required.',
    //         'email.required' => 'Email is required.',
    //         'email.email' => 'Email must be a valid email address.',
    //         'email.unique' => 'Email has already been taken.',
    //         'password.min' => 'Password must be at least 8 characters.',
    //         'password.confirmed' => 'Password confirmation does not match.',
    //     ];
    // }
}
