<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@atlantasanad.ma'],
            [
                'name' => 'Direction Biougra',
                'password' => Hash::make('AtlantaSanad2026!'),
            ]
        );
    }
}
