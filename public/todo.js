$(document).ready(function(e) {
page();
$('#add-todo').button({icons:{primary:"ui-icon-circle-plus"}});
$('#new-todo').dialog({modal :true, autoOpen : false});
$('#delete-confirm').dialog({modal :true, autoOpen : false});
$('#edit').dialog({modal :true, autoOpen : false});
$('#add-todo').button({
    icons: { primary: "ui-icon-circle-plus" }}).click(
        function() {
            $('#new-todo').dialog('open');
    }); // open dialog box

   $('#new-todo').dialog({
        modal : true, autoOpen : false,
        buttons : {
            
            "Add task" : function () {
                var taskName = $('#task').val();
                var userName = $('#user').val();
                if (taskName === '') { return false; }
                var taskHTML = '<li><span class="done">%</span>';
                taskHTML += '<span class="edit">+</span>';
                taskHTML += '<span class="delete">x</span>';
                taskHTML += '<span class="task"></span>';
                taskHTML += '<span class="user"></span></li>';
                var $newTask = $(taskHTML);
                $newTask.find('.task').text(taskName);
                $newTask.find('.user').text(userName);
                $newTask.hide();
                $('#todo-list').prepend($newTask);
                $newTask.show('clip',250).effect('highlight',1000);
                $(this).dialog('close');
            },
            "Cancel": function(){$(this).dialog('close');}
        },
               
    close: function(){
        $('#new-todo input').val('');
    } //clear input task name 
}); // end of dialog 

$('#todo-list').on('click','.done',function(){
    var $taskItem = $(this).parent('li');
    $taskItem.slideUp(250,function(){
        var $this = $(this);
        $this.detach();
        $('#completed-list').prepend($this);
        $this.slideDown();
    });
}); //mark completed task

$('.sortlist').sortable({
    connectWith:'.sortlist',
    cursor:'pointer',
    placeholser: 'ui-state-highight',
    cancel: '.delete,.done,.edit'
});


$('.sortlist').on('click','.delete',function(){
    var $this = $(this);
    
    $('#delete-confirm').dialog({
        modal : true, autoOpen : false,
        buttons : {
        "Confirm" : function () {  
        $(this).dialog('close'); 
        $this.parent('li').effect('puff',function(){
            this.remove();
        });
        
        },
            "Cancel": function(){
            $(this).dialog('close');
            }
        }
    });
    $('#delete-confirm').dialog('open');
});

$('#todo-list').on('click','.edit',function(){
    
    var $taskName = $(this).parent('li').find('.task');
    var $userName = $(this).parent('li').find('.user');
    var $newTaskName=$('#edit-task');
    var $newUserName=$('#edit-user');
    $newTaskName.val($taskName.html());
    $newUserName.val($userName.html());
    $('#edit').dialog({
        buttons : {
        "Confirm" : function () {  
        $(this).dialog('close'); 

        $taskName.text($newTaskName.val()),
        $userName.text($newUserName.val());
        
            },
        "Cancel": function(){
                $(this).dialog('close');
            }
        }
    });
 $('#edit').dialog('open');
});

}); 