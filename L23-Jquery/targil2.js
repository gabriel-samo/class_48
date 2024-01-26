$(()=>{
    $('#darkModeToggle').on('click', ()=>{
        console.log();
        $('body').toggleClass('dark-mode');
        $('#darkModeToggle').toggleClass('dark-mode');
        if($('body').hasClass('dark-mode')){
            $("#darkModeToggle").text('Normal Mode');
        } else {
            $("#darkModeToggle").text('Dark Mode');
        }
    })
});