<?php

use App\Http\Controllers\Api\NameColorController;
use App\Http\Controllers\Api\WordController;
use App\Http\Controllers\Api\FavoriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

//this gives you api endpoints
Route::apiResource('name-colors', NameColorController::class);
Route::apiResource('words', WordController::class);
Route::apiResource('favorites', FavoriteController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/proxy/vocabulary', function (Request $request) {
    $response = Http::withHeaders([
        'x-api-key' => env('VITE_FINNFAST_API_KEY'),
        'accept' => 'application/json',
    ])->get('https://finnfast.fi/api/words', [
        'limit' => $request->query('limit', 10),
        'page' => $request->query('page', 1),
        'all' => $request->query('all', false),
    ]);

    if ($response->failed()) {
        Log::error('FinnFast API Error:', $response->json());
        return response()->json(['error' => 'Failed to fetch data from FinnFast API'], $response->status());
    }

    $data = $response->json();

    $words = $data['words'] ?? [];

    $filteredWords = collect($words)->filter(function ($item) {
        return isset($item['finnish']) && isset($item['english']);
    })->values();

    Log::info('Filtered words:', $filteredWords->toArray());

    return response()->json($filteredWords);
});

Route::apiResource('favorites', FavoriteController::class);
