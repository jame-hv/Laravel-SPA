<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::query()
                ->select('id', 'name', 'email', 'created_at')
                ->orderBy('created_at', 'desc')
                ->paginate(10)
                ->withQueryString(),
        ]);
    }

    public function store(CreateUserRequest $request): RedirectResponse
    {
        User::create($request->validated());

        return back()->with('success', 'User created successfully.');
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();


        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($validated['password']);
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
