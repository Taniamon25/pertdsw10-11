var NIM = "2401010705"
var urlAPI = "https://apimhstiki.ptov.my.id/"
var urlLIST = urlAPI+"/testi-"+NIM+"/read"
var urlDEL = `${urlAPI}/testi`

$("#infsukses").hide()
$("#infgagal").hide()
$(function(){
    listdata()
})

function listdata(){
    $.ajax({
        url: urlLIST,
        method: 'GET',
        DataType: 'json',
        success: function(dta){
            let tbl = ""
            let idx = 0
            if((dta.error == 0)||(dta.error==4)) {
                dta.TESTI.forEach(function(isi){
                    idx = isi.IDX
                    tbl += `<tr>
                    <td>${isi.NAMA}</td>
                    <td>${isi.EMAIL}</td>
                    <td>${isi.TESTI}</td>
                    <td>${isi.IPX}</td>
                    <td><a onclick="destroy('${idx}')" class="btn btn-danger btn-sm"> Hapus </a></td>
                  </tr>`
                })
                $("tbody").html(tbl)
            }
        },
        error:function(){
            console.log("Gagal mengambil Data Testimoni")
        }
    })
}
function destroy(idx){
    $.ajax({
        url:urlDEL,
        method:'post',
        data:'ACT=destroy&NIM='+NIM+'&IDX='+idx,
        dataType:'json',
        success: function(dta){
            console.log(dta)
            if(dta.error ==0){
                $("#infsukses").show()
                $("#infsukses").html("Data Testimoni Berhasil Dihapus")
            }else{
                $("#infgagal").show() 
            }
            setTimeout(function(){
                window.location.reload(1)
            },3000)
        },
        error:function(){
            console.log("Terjadi Masalah saat Menghapus Data")
        }
    })
}