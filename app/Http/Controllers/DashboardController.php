<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Get total users
        $totalUsers = User::count();

        // Get last month's user count for growth calculation
        $lastMonthUsers = User::whereMonth('created_at', '=', now()->subMonth()->month)->count();
        $currentMonthUsers = User::whereMonth('created_at', '=', now()->month)->count();

        // Calculate growth percentage
        $growthPercentage = $lastMonthUsers > 0
            ? (($currentMonthUsers - $lastMonthUsers) / $lastMonthUsers) * 100
            : 0;

        // Get monthly user registrations for the last 6 months
        $monthlyData = User::select(
            DB::raw('MONTHNAME(created_at) as month'),
            DB::raw('COUNT(*) as users'),
            DB::raw('MIN(created_at) as created_at_min'), // Added for proper ordering
        )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy(DB::raw('MONTHNAME(created_at)'), DB::raw('MONTH(created_at)'))
            ->orderBy('created_at_min', 'ASC')
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'growthPercentage' => round($growthPercentage, 1),
                'monthlyData' => $monthlyData,
            ],
        ]);
    }
}
