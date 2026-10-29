async function calculate() {

    const num1 = Number(document.getElementById("num1").value);
    const num2 = Number(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;

    const response = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            num1,
            num2,
            operation
        })
    });

    const data = await response.json();

    document.getElementById("result").innerText =
        "Result: " + data.result;
}

async function loadHistory() {

    const response =
        await fetch("http://127.0.0.1:5000/history");

    const history =
        await response.json();

    let html = `
        <h3>Calculation History</h3>

        <table border="1">
            <tr>
                <th>ID</th>
                <th>Operation</th>
                <th>Num1</th>
                <th>Num2</th>
                <th>Result</th>
                <th>Time</th>
            </tr>
    `;

    history.forEach(item => {

        html += `
            <tr>
                <td>${item.id}</td>
                <td>${item.operation}</td>
                <td>${item.num1}</td>
                <td>${item.num2}</td>
                <td>${item.result}</td>
                <td>${item.created_at}</td>
            </tr>
        `;
    });

    html += "</table>";

    document.getElementById("history").innerHTML = html;
}