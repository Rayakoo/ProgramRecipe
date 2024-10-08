const food_name = document.getElementById("food_name");
const source = document.getElementById("source");
const nutrition = document.getElementById("nutrition-list");
const ingredient = document.getElementById("ingredients-list");
const edamame = document.getElementById("edamame");
const isiGambarDiv = document.querySelector('.isi_gambar');


let currentPage = 0; 
const itemsPerPage = 1; 
let data = {}; 

async function loadrecipe() {
    const input = document.getElementById("food").value;
    try {
        const response = await fetch('https://api.edamam.com/search?q=' + input + '&app_id=a4db0b29&app_key=e7ab733fc627a1b9874817890251b4ac');
        data = await response.json();
        
        currentPage = 0; 
        renderRecipes(); 
    } catch (error) {
       
    }
}



function renderRecipes() {
    const startIndex = currentPage * itemsPerPage; 
    const paginatedHits = data.hits.slice(startIndex, startIndex + itemsPerPage); 

    if (paginatedHits.length > 0) {
        const hit = paginatedHits[0]; 
        const imageUrl = hit.recipe.image;
        isiGambarDiv.innerHTML = `<img src="${imageUrl}" alt="Recipe Image" style="width: 100%; height: auto;">`;
        food_name.innerHTML = hit.recipe.label;
        source.innerHTML = hit.recipe.url ;
        edamame.innerHTML = hit.recipe.shareAs ;

        source.href = hit.recipe.url;
        edamame.href = hit.recipe.shareAs;

        let contentbahan= '';
        hit.recipe.ingredientLines.forEach((ingredient, index) => {
            contentbahan += `<p>- (${index + 1}) ${ingredient}</p>`;
        });
        ingredient.innerHTML=contentbahan;

        let contentnutrisi = '';
        const nutrientsToPrint = ['ENERC_KCAL', 'FAT', 'SUGAR','CHOCDF','PROCNT','CHOLE']

        nutrientsToPrint.forEach(nutrientKey => {
            const nutrient = hit.recipe.totalNutrients[nutrientKey];
            if (nutrient) {
                
                contentnutrisi += `${nutrient.label}: ${nutrient.quantity} ${nutrient.unit}<br>`;
            }
        });

        nutrition.innerHTML = contentnutrisi;
    }

 
}



function changePage(direction) {
    currentPage += direction; 
    renderRecipes(); 
}


document.getElementById('button-back').addEventListener('click', () => changePage(-1));
document.getElementById('button-next').addEventListener('click', () => changePage(1));
