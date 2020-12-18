$(document).ready(region);
function region () {
    $('#region').change(function (e) {
        e.preventDefault();
        let region = $(this).val();
        $('#province').empty();
        switch (region) {
            case "NCR":
                putProvinces(['NCR'])
                break;
            case "CAR":

                putProvinces(parseProvinces("Abra,Apayao,Benguet,Ifugao,Kalinga,Mountain Province"));
                break;
            case "R1":
                putProvinces(parseProvinces("Ilocos Norte,Ilocos Sur,La Union,Pangasinan"));
                break;
            case "R2":
                putProvinces(parseProvinces("Batanes,Cagayan,Isabela,Nueva Vizcaya,Quirino"));
                break;
            case "R3":
                putProvinces(parseProvinces("Aurora,Bataan,Bulacan,Nueva Ecija,Pampanga,Tarlac,Zambales"));
                break;
            case "R4":
                putProvinces(parseProvinces("Batangas,Cavite,Laguna,Quezon,Rizal"));
                break;
            case "MIMA":
                putProvinces(parseProvinces("Marinduque,Occidental Mindoro,Oriental Mindoro,Palawan,Romblon"));
                break;
            case "R5":
                putProvinces(parseProvinces("Albay,Camarines Norte,Camarines Sur,Catanduanes,Masbate,Sorsogon"));
                break;
            case "R6":
                putProvinces(parseProvinces("Aklan,Antique,Capiz,Guimaras,Iloilo,Negros Occidental"));
                break;
            case "R7":
                putProvinces(parseProvinces("Bohol,Cebu,Negros Oriental,Siquijor"));
                break;
            case "R8":
                putProvinces(parseProvinces("Biliran,Eastern Samar,Leyte,Northern Samar,Samar,Southern Leyte"));
                break;
            case "R9":
                putProvinces(parseProvinces("Zamboanga del Norte,Zamboanga del Sur,Zamboanga Sibugay"));
                break;
            case "R10":
                putProvinces(parseProvinces("Bukidnon,Camiguin,Lanao del Norte,Misamis Occidental,Misamis Oriental"));
                break;
            case "R11":
                putProvinces(parseProvinces("Davao de Oro,Davao del Norte,Davao del Sur,Davao Occidental,Davao Oriental"));
                break;
            case "R12":
                putProvinces(parseProvinces("Cotabato,Sarangani,South Cotabato,Sultan Kudarat"));
                break;
            case "R13":
                putProvinces(parseProvinces("Agusan del Norte,Agusan del Sur,Dinagat Islands,Surigao del Norte,Surigao del Sur"));
                break;
            case "BARMM":
                putProvinces(parseProvinces("Basilan,Lanao del Sur,Maguindanao,Sulu,Tawi-Tawi"));
                break;
        }
    });
};

function parseProvinces(provinces) {
    return provinces.split(',');
}

function putProvinces(provinces) {
    $("select[id='province']").nextAll().remove();
    let html = `
        <div class="nice-select" tabindex="0">
                <span class="current">${provinces[0]}</span>
                <ul class="list">`;
    provinces.forEach(province => {
        html += `<li data-value="${province}" class="option">${province}</li>`;

    });
    html += `</ul>
        </div>`
    $(html).insertAfter($("#province"));
};

