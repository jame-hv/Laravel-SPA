<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin/test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create 99 more users with random creation dates in the last 12 months
        $now = Carbon::now();
        $twelveMonthsAgo = $now->copy()->subMonths(12);

        User::factory()
            ->count(99)
            ->create()
            ->each(function ($user) use ($twelveMonthsAgo, $now): void {
                // Set a random created_at date between 12 months ago and now
                $randomDate = Carbon::createFromTimestamp(
                    rand($twelveMonthsAgo->timestamp, $now->timestamp),
                );

                $user->created_at = $randomDate;
                $user->updated_at = $randomDate;
                $user->save();
            });
    }
}
