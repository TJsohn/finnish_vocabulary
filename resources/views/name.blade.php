<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Name and Color Manager</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body>
    <main class="container">
        <h1>Name and Color Manager</h1>

        @if (session('success'))
            <div class="alert" style="color: var(--accent-1); margin-bottom: 1em;">
                {{ session('success') }}
            </div>
        @endif

        <form method="post" action="{{ route('name.store') }}">
            @csrf
            <div>
                <label class="label" for="name">Name</label>
                <input type="text" name="name" class="input" placeholder="Enter name" id="name"
                    autocomplete="off" value="{{ old('name') }}" />
                @error('name')
                    <span class="error" style="color: var(--accent-1);">{{ $message }}</span>
                @enderror
            </div>
            <div>
                <label class="label" for="color">Favorite Color</label>
                <input type="text" name="color" class="input" placeholder="Enter color" id="color"
                    autocomplete="off" value="{{ old('color') }}" />
                @error('color')
                    <span class="error" style="color: var(--accent-1);">{{ $message }}</span>
                @enderror
            </div>
            <button type="submit" class="btn btn-default">Add Name and Color</button>
        </form>
        @if ($nameColors->isNotEmpty())
            <h2>Stored Names and Colors</h2>
            <table class="table" border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($nameColors as $nameColor)
                        <tr>
                            <td>{{ $nameColor->name }}</td>
                            <td>{{ $nameColor->color }}</td>
                            <td>
                                <a href="{{ route('name.edit', $nameColor->id) }}" class="btn btn-default">Edit</a>
                                <form action = "{{ route('name.destroy', $nameColor->id) }}" method="post"
                                    onsubmit="return confirm('Are you sure you want to delete?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-accent">Delete</button>
                                </form>
                            </td>


                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </main>
</body>

</html>
