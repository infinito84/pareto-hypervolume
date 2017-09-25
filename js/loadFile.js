window.loadFile = function(input) {
    if (input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            if (reader.result) {
                var data = [];
                reader.result.split('\n').forEach(function(line, i) {
                    if (line) {
                        var values = line.trim().split('\t');
                        if (values.length !== 2) {
                            return alert('Error importando línea:' + (i + 1));
                        }
                        data.push({
                            x: parseFloat(values[0]),
                            y: parseFloat(values[1])
                        })
                    }
                });
                calcPareto(data);
            }
        }

        reader.readAsText(input.files[0]);
    }
}
