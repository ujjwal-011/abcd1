$(function() {

    let problemSolved=[];

        $(".go").on("click",function(){
        let user=$("#handle").val()
        let url="https://codeforces.com/api/user.status?handle="+user;
        console.log(user)
        fetch(url).then(function(response){
        response.json().then(function(res){
            let len=res.result.length;
            for(let i=0;i<len;i++){
                let str="";
                str+=(res.result[i].problem.contestId).toString();
                str+=(res.result[i].problem.index);
                if(res.result[i].verdict=="OK") problemSolved.push(str);
            }
        })
    })
})

    $(".gen").on("click",function(){
        let url= "https://codeforces.com/api/problemset.problems";
        fetch(url).then(function(response){
            response.json().then(function(res){
                let len=res.result.problems.length;
                for(let i=0;i<len;i++){
                    if(res.result.problems[i].rating>=1500 && res.result.problems[i].rating<=1800){
                        let str1=(res.result.problems[i].contestId).toString() + res.result.problems[i].index;
                        let len1=problemSolved.length;
                        let ok=true
                        for(let j=0;j<len1;j++){
                            if(problemSolved[j]===str1){
                                ok=false
                                break;
                            }
                        }
                        if(ok===true){
                        let str="https://codeforces.com/problemset/problem/"+(res.result.problems[i].contestId).toString() + "/" + res.result.problems[i].index;
                        $("#question").val(str)
                        break;
                    }
                  }
                }
            })
        })
    })
})
