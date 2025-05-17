<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NameColor;
use Illuminate\Http\Request;

class NameColorController extends Controller
{
    public function index()
    {
        return NameColor::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:50',
        ]);

        $nameColor = NameColor::create($validated);
        return response()->json($nameColor, 201);
    }

    public function show($id)
    {
        return NameColor::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $nameColor = NameColor::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'color' => 'sometimes|string|max:50',
        ]);

        $nameColor->update($validated);
        return response()->json($nameColor);
    }

    public function destroy($id)
    {
        $nameColor = NameColor::findOrFail($id);
        $nameColor->delete();
        return response()->json(null, 204);
    }
}
