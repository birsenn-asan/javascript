let listDOM = document.querySelector('#list')   //Eklenecek liste seçimi için id bilgisi verildi
let LocalTask = {id:"", task:"" , check: false} //LocalStorage bilgilerini tutacak object bilgisi
let ArrayTask = []                              //LocalStorage için array oluşturuldu
let i=0;                                        //id ataması için değişken atanarak dizi elemanına kolay ulaşıldı

//LocalStorage işlemleri
if(localStorage.getItem('load'))  
{   
    ArrayTask = JSON.parse(localStorage.getItem('load')) 
    ArrayTask.forEach(function (element)                 //LocalStorage 'deki bilgiyi aktarmak için fonksiyon kullanıldı
    {
        i++;
        element.id = `id${i}`;                           //LocalStorage yeni id bilgisi atandı
        localStorage.setItem('load', JSON.stringify(ArrayTask))

        let liDOM = document.createElement(`li`)        //liste elemanını oluşturuldu
        liDOM.setAttribute('id',`id${i}`)               //liste elemanına "id" atandı
        liDOM.innerHTML =                               //liste elemanına Eklencek bilgi verildi



        //(${element.task} liste elemanı bilgisi eklendi ve button ile x silme işlemi için button fonksiyon ile verildi
        
        `
        ${element.task} 
        <button
        class="close" 
        style="width: 50px; height: 50px; text-align: center;"
        onclick="RemoveFunc(${i})"
        >x
        </button>
        `


        listDOM.append(liDOM)    //liste elemanını listenin sonuna eklenmesisağlandı
        if(ArrayTask[i-1].check) //liste elemanı "check" edilmiş ise eklendi bilgisi verme işlemi 
        {
            let changeLi = document.querySelector(`#id${i}`) //liste elamanı atandı
            changeLi.classList.add("checked")                //liste elamanına"checked" classını ekle
        }
    });
}

//listeye kullanıcının ekle buttonu yerine enter tuşu ile ekleme yapabilmesi için buttonun tipi değiştirildi
let elem = document.querySelector('#liveToastBtn')
elem.outerHTML = `<button type="submit" onclick="newElement()" id="liveToastBtn" class="button" style ="border-width: 0px">${elem.innerHTML}</button>`;


//inputtaki bilginin alınması
let userTaskDOM = document.querySelector('#userTask')
userTaskDOM.addEventListener('submit', formHandler)

//inputtaki işlemlerin yapılması
function formHandler(event) {
    event.preventDefault()                          //kullanıcı tarafından sayfa yenilenmesini önlemek 
    const TASK = document.querySelector("#task")    //Kutudaki bilginin sabit kalması
    
    //"input" kullanıcı tarafından boş bırakılırsa toast ile kullanıcıya ekleme yapamayacağı uyarısı verildi
    if (TASK.value.trim() == ""){   
        $(".error").toast("show");  
    } 
    else{
        addItem(TASK.value)          //Bilgi ekleme fonksiyonun çalışması
        TASK.value = ""              //Bilgi ekle denildikten sonra input değerinin boş olması 
        $(".success").toast("show"); //Kullanıcının değer girmesi ile listeye eklendiği uyarısı verilmesi
    }
}


//Bilgi ekleme fonksiyonu
const addItem = (task) => 
{ 
    i+=1;

    LocalTask.task = task;    //"object" olarak bilginin gönderilmesi
    LocalTask.id = `id${i}`;  //"object" olarak id bilgisinin gönderilmesi
    ArrayTask.push(LocalTask) //LocalStorage için "object" içerisinde yer alan bilgilerin gönderilmesi
    localStorage.setItem('load', JSON.stringify(ArrayTask))
    ArrayTask = JSON.parse( localStorage.getItem('load'))

    let liDOM = document.createElement(`li`)        //liste elemanının oluşturulması
    liDOM.setAttribute('id',`id${i}`)               //liste elemanına id eklenmesi
    liDOM.innerHTML =                               //liste elemanına eklenecek bilginin verilmesi
    `
    ${task} 
    <button 
    class="close" 
    style="width: 50px; height: 50px; text-align: center;"
    onclick="RemoveFunc(${i})"
    >x
    </button>
    `
    listDOM.append(liDOM)       //listeye eklenen elemanın listenin sonuna eklenmesi 
}

//Silme işlemi fonksiyonu
function RemoveFunc(j) {                                        //"j" id numarası
    const element = document.querySelector(`#id${j}`);          //silinecek liste elemanını için id bilgisi verildi

    let index = ArrayTask.findIndex(function (Atask) {          //silinecek liste elemnını LocalStorage içindeki "index" bilgisine erişmek
        return JSON.stringify(Atask).indexOf(`id${j}`) >= 0
    });
        ArrayTask.splice(index, 1)                              //Liste içerisinden silinmek istenen elemanı LocalStorage içinden silme
        localStorage.setItem('load', JSON.stringify(ArrayTask)) //sildikten sonra tekrar set etmemiz lazım
        ArrayTask = JSON.parse( localStorage.getItem('load') )
        element.remove();                                       //liste elemanının silinmesi
}

//Checked(Ekleme) işlemleri
document.addEventListener('click', (element) =>                 //click ile seçilen elemana ulaşma
{
    if(element.target.matches('li'))                            //seçili olan elemanın liste elemanı mı diye kontrolün yapılması
    {
        let elementId = element.target.id;                      //liste elemanının id bilgisine ulaşma
        let index = ArrayTask.findIndex(function (Atask) {      //liste elemanının LocalStorage içindeki index bilgisine ulaşmak
            return JSON.stringify(Atask).indexOf(`${elementId}`) >= 0
        });
        ArrayTask[index].check = !(ArrayTask[index].check)      //LocalStorage içindeki check bilgisinin değiştirilmesi
        localStorage.setItem('load', JSON.stringify(ArrayTask)) //Daeğişme işlemi gerçekleştikten sonra set işleminin yapılması 
        ArrayTask = JSON.parse( localStorage.getItem('load') )
        
        let changeLi = document.querySelector(`#${elementId}`) //listeye elemanın atanması
        changeLi.classList.toggle("checked")                   //liste elamanında "checked" class bilgisi varsa kaldır yoksa ekle
    }
});
