<?php

namespace App\Http\Controllers;

use App\Models\NameColor;
use Illuminate\Http\Request;

class NameController extends Controller
{
    public function index()
    {
        $nameColors = NameColor::all();
        return view('name', ['nameColors' => $nameColors]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:50',
        ]);

        NameColor::create($validated);

        return redirect()->route('name.index')->with('success', 'Name and color added successfully!');
    }

    public function edit($id)
    {
        $nameColor = NameColor::findOrFail($id);
        return view('name_edit', ['nameColor' => $nameColor]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:50',
        ]);

        $nameColor = NameColor::findOrFail($id);
        $nameColor->update($validated);

        return redirect()->route('name.index')->with('success', 'Name and color updated successfully!');
    }

    public function destroy($id)
    {
        $nameColor = NameColor::findOrFail($id);
        $nameColor->delete();

        return redirect()->route('name.index')->with('success', 'Name and color deleted successfully!');
    }
}
