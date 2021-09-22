
let requestURL = 'https://api.jsonserve.com/zeLRwO'
const request = new XMLHttpRequest()
request.open ('GET', requestURL)
request.responseType = 'json'
request.send()
request.onload = function (){
   tableData = request.response;
    createTR(tableData)
}

let body = document.querySelector(".body")

let wrapper = document.querySelector(".wrapper")
body.append(wrapper)

let table = document.querySelector(".table")
wrapper.append(table)

let fieldset = document.querySelector('.fieldset')
wrapper.append(fieldset)
let tableRow;
let tableData;
let tableDataName;
let tableRows;

// создана функция отрисовки строк таблицы, на основе массива данных

let createTR = function (jsonObj) {
    for (let i = 0; i < jsonObj.length; i++) {
        tableRow = document.createElement("tr")
        tableRow.classList.add('table-row')

        tableDataName = document.createElement("td")
        tableDataName.classList.add('table-row_dataName')
        tableDataName.innerText = jsonObj[i].name.firstName


        let tableDataLastName = document.createElement('td')
        tableDataLastName.classList.add('table-row_dataLastName')
        tableDataLastName.innerText = jsonObj[i].name.lastName

        let tableDataAbout = document.createElement('td')
        tableDataAbout.classList.add('table-row_dataAbout')
        tableDataAbout.innerText = jsonObj[i].about

        let tableDataEyeColor = document.createElement('td')
        tableDataEyeColor.classList.add('table-row_dataColor')

        let colorBox = document.createElement('div')
        colorBox.classList.add('colorBox')
        tableDataEyeColor.append(colorBox)

        // с помощью условных операторов присваиваем цвет фона для дивов в колонке eyeColor
        if (jsonObj[i].eyeColor === 'red') {
            colorBox.style.backgroundColor = '#FF7A7A'
        } else if (jsonObj[i].eyeColor === 'brown') {
            colorBox.style.backgroundColor = '#663434'
        } else if (jsonObj[i].eyeColor === 'blue') {
            colorBox.style.backgroundColor = '#7caedd'
        } else if (jsonObj[i].eyeColor === 'green') {
            colorBox.style.backgroundColor = '#8dd68d'
        }

        table.append(tableRow)
        tableRow.append(tableDataName)
        tableRow.append(tableDataLastName)
        tableRow.append(tableDataAbout)
        tableRow.append(tableDataEyeColor)

        // вызов функии создающий форму редактирования данных выбранной строки
        makeFieldset()

    }

}

// функция для удаления рядов при сортировке таблицы
function removeRows (){
    document.querySelectorAll('.table-row').forEach(elem => elem.remove())
}

// добавляем слушатели событий на заголовки для сортировки таблицы по алфавиту

//сортировка столбца имен

document.getElementById('firstNameUp').addEventListener('click', sortNameAZ )
        function sortNameAZ (){
        removeRows()
        console.log('hello stas')
        let sortedByNameAZ = tableData.sort(function (obj1, obj2){
            if (obj1.name.firstName < obj2.name.firstName)
            {return -1}
            else if (obj1.name.firstName > obj2.name.firstName) {
                return 1}
            return 0;
        })
   createTR(sortedByNameAZ)
    }

document.getElementById('firstNameDown').addEventListener('click', sortNameZA)

function sortNameZA (){
    removeRows()
    console.log('hello StasZA')
    let sortedByFirstNameZA = tableData.sort(function (obj1, obj2){

        if(obj1.name.firstName>obj2.name.firstName){
            return -1;
        }
        else if (obj2.name.firstName>obj1.name.firstName){
            return 1;
        }
        return 0;
    })
    createTR(sortedByFirstNameZA)
}
 // сортировка столбца фамилий

    document.getElementById('lastNameUp').addEventListener('click', function (){
        removeRows()
        let sortedByLastNameAZ = tableData.sort(function (obj1, obj2){

            if (obj1.name.lastName < obj2.name.lastName)
            {return -1}
            if (obj1.name.lastName > obj2.name.lastName) {
                return 1}
            return 0;
        })
            createTR(sortedByLastNameAZ)
    })

    document.getElementById('lastNameDown').addEventListener('click', function (){
        removeRows()
        let sortedByLastNameZA = tableData.sort(function (obj1, obj2){

            if(obj1.name.lastName>obj2.name.lastName){
                return -1;
            }
            else if (obj2.name.lastName>obj1.name.lastName){
                return 1;
            }
            return 0;
        })
        createTR(sortedByLastNameZA)
    })

// сортировка столбца с описанием

    document.getElementById('aboutUp').addEventListener('click', function (){
        removeRows()

        let sortedByAboutAZ = tableData.sort(function (obj1, obj2){

            if (obj1.about < obj2.about)
            {return -1}
            if (obj1.about > obj2.about) {
                return 1}
            return 0;
        })
        createTR(sortedByAboutAZ)
    })

    document.getElementById('aboutDown').addEventListener('click', function (){
        removeRows()
        let sortedByAboutZA = tableData.sort(function (obj1, obj2){

            if(obj1.about>obj2.about){
                return -1;
            }
            else if (obj2.about>obj1.about){
                return 1;
            }
            return 0;
        })
        createTR(sortedByAboutZA)
    })

// сортировка столбца с цветом глаз

    document.getElementById('eyeColorUp').addEventListener('click', function (){
        removeRows()

        let sortedByColorAZ = tableData.sort(function (obj1, obj2){

            if (obj1.eyeColor < obj2.eyeColor)
            {return -1}
            if (obj1.eyeColor > obj2.eyeColor) {
                return 1}
            return 0;
        })
        createTR(sortedByColorAZ)
    })

    document.getElementById('eyeColorDown').addEventListener('click', function (){
        removeRows()
        let sortedByEyeColorZA = tableData.sort(function (obj1, obj2){

            if(obj1.eyeColor>obj2.eyeColor){
                return -1;
            }
            else if (obj2.eyeColor>obj1.eyeColor){
                return 1;
            }
            return 0;
        })
        createTR(sortedByEyeColorZA)
    })


// создано поле для редактирования данных в ячейке

    function makeFieldset() {
        tableRows = document.querySelectorAll('.table-row')
        let chosenName;

        // на каждый ряд добавлен слушатель событий и созданы инпуты для соответсвуещей ячейки с данными
        for (let el = 0; el < tableRows.length; el++) {

            tableRows[el].addEventListener('click', function () {
                chosenName = tableRows[el].querySelector('.table-row_dataName')
                fieldset.innerText = ''
                fieldset.style.display = "flex"
                let textAreaName = document.createElement("input")
                let textAreaLastName = document.createElement('input')
                let textAreaAbout = document.createElement('input')
                let texAreaColor = document.createElement('input')

                textAreaName.classList.add(".fieldset_textArea")
                textAreaLastName.classList.add('.fieldset_textArea')
                textAreaAbout.classList.add('.fieldset_textArea')
                texAreaColor.classList.add('.fieldset_textArea')

                let buttonSave = document.createElement('button')
                buttonSave.classList.add('buttonSave')
                buttonSave.innerText = 'Save Changes'


                fieldset.append(textAreaName)
                fieldset.append(textAreaLastName)
                fieldset.append(textAreaAbout)
                fieldset.append(texAreaColor)
                fieldset.append(buttonSave)

// находим в json тот объект с которым мы сейчас работаем по имени так как имена уникальные
                let person = tableData.find(item => item.name.firstName === chosenName.innerText)

                let tableDataIndex = tableData.indexOf(person)

                // присваиваем значения для созданных  инпутов

                textAreaName.value = person.name.firstName
                textAreaLastName.value = person.name.lastName
                textAreaAbout.value = person.about
                texAreaColor.value = person.eyeColor

// по клику на кнопку по индексу переписываем значение в свойстве объекта
                buttonSave.addEventListener('click', function () {

                    function reassign(array, index, newValue) {
                        tableData[tableDataIndex].name.firstName = textAreaName.value
                        tableData[tableDataIndex].name.lastName = textAreaLastName.value
                        tableData[tableDataIndex].about = textAreaAbout.value
                        tableData[tableDataIndex].eyeColor = texAreaColor.value
                        return tableData;
                    }

                    reassign(tableData, [tableDataIndex], textAreaName.value)
                    removeRows()
                    createTR(tableData)

                })
            })
        }
    }




