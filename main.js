$(document).ready(function() {

    // start board sequance

    var userSeq =[];
    var simonSeq =[];
    var id , color, level =0;

    $('.start').click(function () {
        level++ ;
        startSeq();
    });

    //Simon turn

    function startSeq(){
        $('.display').text(level);
        randomNum();
        var i =0;
        var myInterva = setInterval(function () {
            id = simonSeq[i];
            color =$('#'+id).attr('class').split(' ')[1];
            addClassSound(id , color);
            // console.log(id +' '+color)
            i++
            if (i ===simonSeq.length){
                clearInterval(myInterva)
            }
        },1000)
    }
    //user turn

    $('.pad').click(function () {
        // cursor in progress
        // this.style.cursor = "url('img/human-hand.jpg')";
        id= $(this).attr('id');
        userSeq.push(parseFloat(id));
        color = $(this).attr('class').split(' ')[1];
        // console.log(id +' '+ color)
        addClassSound(id , color);
        //check user seq
        if (!userCorrect()) {
            displayError();
            userSeq=[];
            simonSeq=[];
        }
        //checking end of seq
        if (userSeq.length === simonSeq.length){
            level++;
            userSeq =[];
            startSeq();
        }
    });

    //user vs simon
    function userCorrect() {
        console.log(userSeq);
        console.log(simonSeq);
        for (var i = 0 ; i < userSeq.length ; i++) {
            if (userSeq[i] !== simonSeq[i]) {
                console.log('false');

                return false
            }
        }
        console.log('true');
        return true


    }

    //error function

    function displayError() {
        var lives = 0;
        var myError = setInterval(function () {
            $('.display').text('!!');
            lives++;
            if (lives === 3) {
                level = 0;
                clearInterval(myError);
                userSeq =[];
                lives = 0;
            }
        }, 1000)
    }



    //random num

    function randomNum() {
        var random = Math.floor(Math.random() *4);
        simonSeq.push(random);
    }

    //add a temporary class and sound

    function addClassSound(id , color) {
        $('#'+id).addClass(color+'-active');
        // playSound(id)
        setTimeout(function() {
            $('#' + id).removeClass(color+'-active')
        },500 );
    }


});
