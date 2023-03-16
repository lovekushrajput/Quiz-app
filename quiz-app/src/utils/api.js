export function fetchCategory(selectedCat){
    return fetch('https://opentdb.com/api_category.php')
        .then((res) => res.json())
        .then((c) => {
            if (!c.trivia_categories) {
                throw new Error(c.message)
            }
        return c.trivia_categories.filter((category)=> {
            if(category.name.includes(selectedCat)){
                return category
            }

            if(selectedCat==='All'){
                return category
            }
         })
        })
}


export function fetchQuestion(category, difficulty) {
   return fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`)
        .then((res) => res.json())
        .then((data) => data.results)
}
