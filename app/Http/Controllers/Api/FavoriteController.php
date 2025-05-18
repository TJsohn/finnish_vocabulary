<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index()
    {
        return response()->json(Favorite::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'word_id' => 'required|string',
            'finnish' => 'required|string',
            'english' => 'required|string',
            'example' => 'nullable|string',
        ]);

        $favorite = Favorite::create($validated);

        return response()->json($favorite, 201);
    }

    public function destroy($id)
    {
        $favorite = Favorite::findOrFail($id);
        $favorite->delete();

        return response()->json(['message' => 'Favorite deleted successfully']);
    }
}
