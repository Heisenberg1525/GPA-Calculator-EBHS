document.getElementById("grade-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var classCount = parseInt(document.getElementById("class-count").value);
    generateGradeTable(classCount);
});

function generateGradeTable(classCount) {
    var table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>COURSE</th>
            <th>S1/S2/FY</th>
            <th>MP1</th>
            <th>MP2</th>
            <th>ME</th>
            <th>MP3</th>
            <th>MP4</th>
            <th>FE</th>
            <th>FG</th>
            <th>LG</th>
        </tr>
    `;
    for (var i = 1; i <= classCount; i++) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>Class ${i}</td>
            <td>
                <select id="class-type-${i}">
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="FY">FY</option>
                </select>
            </td>
            <td><input type="number" id="mp1-${i}" class="mp-input"></td>
            <td><input type="number" id="mp2-${i}" class="mp-input"></td>
            <td><input type="number" id="me-${i}" class="mp-input"></td>
            <td><input type="number" id="mp3-${i}" class="mp-input"></td>
            <td><input type="number" id="mp4-${i}" class="mp-input"></td>
            <td><input type="number" id="fe-${i}" class="mp-input"></td>
            <td><input type="text" id="fg-${i}" class="fg-input" readonly></td>
            <td><input type="text" id="lg-${i}" class="lg-input" readonly></td>
        `;
        table.appendChild(row);
    }
    document.getElementById("grade-table").innerHTML = "";
    document.getElementById("grade-table").appendChild(table);

    var mpInputs = document.getElementsByClassName("mp-input");
    var fgInputs = document.getElementsByClassName("fg-input");

    for (var j = 0; j < mpInputs.length; j++) {
        mpInputs[j].addEventListener("input", calculateFG);
    }

    function calculateFG() {
        var rowIndex = parseInt(this.id.split("-")[1]);
        var classType = document.getElementById("class-type-" + rowIndex).value;
        var mp1 = parseInt(document.getElementById("mp1-" + rowIndex).value);
        var mp2 = parseInt(document.getElementById("mp2-" + rowIndex).value);
        var me = parseInt(document.getElementById("me-" + rowIndex).value);
        var mp3 = parseInt(document.getElementById("mp3-" + rowIndex).value);
        var mp4 = parseInt(document.getElementById("mp4-" + rowIndex).value);
        var fe = parseInt(document.getElementById("fe-" + rowIndex).value);
        var fg = 0;

        if (classType === "FY") {
            fg = (mp1 * 0.2) + (mp2 * 0.2) + (me * 0.1) + (mp3 * 0.2) + (mp4 * 0.2) + (fe * 0.1);
        } else if (classType === "S1") {
            fg = (mp1 * 0.4) + (mp2 * 0.4) + (me * 0.2);
        } else if (classType === "S2") {
            fg = (mp3 * 0.4) + (mp4 * 0.4) + (fe * 0.2);
        }

        document.getElementById("fg-" + rowIndex).value = fg.toFixed(2);

        // Calculate LG based on FG
        var lg = calculateGrade(fg);
        document.getElementById("lg-" + rowIndex).value = lg;
    }
}

// Function to calculate letter grade based on FG
function calculateGrade(fg) {
    if (fg >= 97.5) {
        return 'A+';
    } else if (fg >= 91.5) {
        return 'A';
    } else if (fg >= 89.5) {
        return 'A-';
    } else if (fg >= 85.5) {
        return 'B+';
    } else if (fg >= 81.5) {
        return 'B';
    } else if (fg >= 79.5) {
        return 'B-';
    } else if (fg >= 76.5) {
        return 'C+';
    } else if (fg >= 71.5) {
        return 'C';
    } else if (fg >= 69.5) {
        return 'C-';
    } else if (fg >= 65.5) {
        return 'D+';
    } else if (fg >= 61.5) {
        return 'D';
    } else if (fg >= 59.5) {
        return 'D-';
    } else {
        return 'F';
    }
}
