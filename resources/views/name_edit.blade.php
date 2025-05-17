<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Name and Color</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body>
    <main class="container">
        <h1>Edit Name and Color</h1>

        <form method="post" action="{{ route('name.update', $nameColor->id) }}">
            @csrf
            @method('PATCH')
            <div>
                <label class="label" for="name">Name</label>
                <input type="text" name="name" class="input" id="name" value="{{ $nameColor->name }}" />
                @error('name')
                    <span class="error" style="color: var(--accent-1);">{{ $message }}</span>
                @enderror
            </div>
            <div>
                <label class="label" for="color">Favorite Color</label>
                <input type="text" name="color" class="input" id="color" value="{{ $nameColor->color }}" />
                @error('color')
                    <span class="error" style="color: var(--accent-1);">{{ $message }}</span>
                @enderror
            </div>
            <button type="submit" class="btn btn-default">Update Name and Color</button>
            <a href="{{ route('name.index') }}" class="btn btn-outline">Cancel</a>
        </form>
    </main>
</body>

</html>
