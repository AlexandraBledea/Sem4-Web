$(document).ready(function(){
    let prevId = null;
    $(".puzzle_piece").click(function() {
        let id = $(this).attr("id");
        if(prevId == null) {
            prevId = id;
        }
        else {
            $.ajax({
                url: "/controller",
                type: "PUT",
                data: {
                    "id1": id,
                    "id2": prevId
                },
                success: function() {
                    window.location = window.location.pathname;
                }
            });
            prevId = null;
        }
    });

});
