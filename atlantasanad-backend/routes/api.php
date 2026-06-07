<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevisController;

// 1. مسارات مفتوحة للعموم (الزوار لي فالموقع باش يصيفطو الطلبات)
Route::post('/devis', [DevisController::class, 'store']);

// 2. مسارات مفتوحة مؤقتاً للـ Dashboard باش نهنيو راسنا من الـ 401 والـ 404 دابا
Route::get('/devis', [DevisController::class, 'index']);

Route::get('/contacts', function() {
    return response()->json(['data' => []], 200);
});

// 3. مسار الـ Logout باش ما يبقاش يدير Network Error فاش تبغي تخرجي
Route::post('/logout', function (Request $request) {
    return response()->json(['status' => 'success', 'message' => 'Déconnecté'], 200);
});

// 4. الحماية لـ باقي المسارات
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});