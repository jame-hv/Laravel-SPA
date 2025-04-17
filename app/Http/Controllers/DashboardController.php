<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

final class DashboardController extends Controller
{
    public function __invoke()
    {
        // get users

        $totalUsers = User::count();

        // get last monhth users

        $lastMonthUsers = User::where('created_at', '>=', now()->subMonth())->count();

        $currentUsers = User::where('created_at', '>=', now()->subMonth())->count();

        $growth = $lastMonthUsers > 0 ? round((($currentUsers - $lastMonthUsers) / $lastMonthUsers) * 100, 2) : 0;


        // Get monthly user registrations for the last 6 months
        $monthlyData = User::select(
            DB::raw('MONTHNAME(created_at) as month'),
            DB::raw('COUNT(*) as users'),
            DB::raw('MIN(created_at) as created_at_min'),
        )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy(DB::raw('MONTHNAME(created_at)'), DB::raw('MONTH(created_at)'))
            ->orderBy('created_at_min', 'ASC')
            ->get();

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'growthPercentage' => round($growth, 1),
                'monthlyData' => $monthlyData,
            ],
        ]);
    }
}
