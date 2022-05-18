$(document).ready(function(){
    $("table").on('click', '.btnDelete', function () {
        let id = $(this).closest('tr')[0].cells[0].innerText;
        $.post("delete.php",{'id': id});
        $(this).closest('tr').remove();
    });

    $("table").on('click', '.btnUpdate', function () {
        let tableId = $(this).closest('tr')[0].cells[0].innerText;
        let tableTitle = $(this).closest('tr')[0].cells[1].innerText;
        let tableAuthor = $(this).closest('tr')[0].cells[2].innerText;
        let tableNumberPages = $(this).closest('tr')[0].cells[3].innerText;
        let tableType = $(this).closest('tr')[0].cells[4].innerText;
        let tableFormat = $(this).closest('tr')[0].cells[5].innerText;
        $(".update_form #id").val(tableId);
        $(".update_form #title").val(tableTitle);
        $(".update_form #author").val(tableAuthor);
        $(".update_form #numberPages").val(tableNumberPages);
        $(".update_form #type").val(tableType);
        $(".update_form #format").val(tableFormat);
        if($(".update_form").css("display") === "none")
            $(".update_form").css("display", "inline");
        else
            $(".update_form").css("display", "none");
    });
});
