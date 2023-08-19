<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory()->createMany([
            [
                'name' => '太郎',
                'email' => 'tarou@example.com',
            ],
            [
                'name' => '花子',
                'email' => 'hanako@example.com',
            ]
        ]);
    }
}
