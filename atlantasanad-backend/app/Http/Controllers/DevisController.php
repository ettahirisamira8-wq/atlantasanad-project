<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Devis; 

class DevisController extends Controller
{
    // 1. الدالة ديال حفظ البيانات المستقبلة من الفورم
    public function store(Request $request)
    {
        // التحقق من البيانات المستقبلة من React
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'telephone' => 'required|string',
            'type_assurance' => 'required|string',
            'message' => 'nullable|string',
        ]);

        // حفظ البيانات فالداتابيز
        $devis = Devis::create($validated);

        return response()->json([
            'message' => 'Devis créé avec succès !',
            'data' => $devis
        ], 201);
    }

    // 2. الدالة ديال جلب البيانات وعرضهم فـ الـ Dashboard (كانت خارج القوس ورجعتها لداخل)
    public function index()
    {
        // جلب كاع الـ Devis مرتبين من الأحدث للأقدم
        return response()->json(Devis::latest()->get(), 200);
    }
} // القوس الأخير ديال الكلاس خاصو يكون هو اللخر فـ الملف!