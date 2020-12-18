
        let data = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        let arr = {}
        function init(){

            let desk = document.querySelector('.desk')
            desk.innerHTML = ''

            for(let a = 0; a < 3; a++){
                for(let b = 0; b < 3; b++){

                    //创建圈
                    let circle = document.createElement('i')
                    circle.classList.add('iconfont', 'icon-circle', 'blue')

                    //创建叉
                    let cross = document.createElement('i')
                    cross.classList.add('iconfont', 'icon-cross', 'purple')

                    //创建空棋子
                    let empty = document.createElement('i')

                    let cell = document.createElement('div')
                    cell.classList.add('cell')

                    let temp = data[a][b] == 2? cross: data[a][b] == 1? circle: empty
                    cell.appendChild(temp)
                    cell.addEventListener('click', () => humenMove(a, b))
                    desk.appendChild(cell)
                }
            }
        }

        function humenMove(x, y){
            if(data[x][y] || checkWinner(data)) return 

            data[x][y] = 1

            if(checkWinner(data) !== null){
                tips(checkWinner(data))
            }
            init()
            robotMove() 
        }

        function tips(chess){
            let tip = document.querySelector('.tips')
            tip.innerText = chess == 1? 'o in winner': chess == 2? 'x is winner': 'tie game!'
        }

        function clone(data){
            return JSON.parse(JSON.stringify(data))
        }

        function robotMove(){
            if(checkWinner(data)) return 
            let bestScore = -2
            let cop = clone(data)
            let score = minMax(cop, 0 , true)

            data[arr.x][arr.y] = 2
            if(checkWinner(data) !== null){
                tips(checkWinner(data))
            }
            init()
        }

        function equals3(a, b, c){
            return a == b && b == c && a != ''
        }

        function checkWinner(data){
            let winner = null

            //水平
            for(let i = 0; i < 3; i++){
                if(equals3(data[i][0], data[i][1], data[i][2])){
                    winner = data[i][0]
                }
            }

            //垂直
            for(let i = 0; i < 3; i++){
                if(equals3(data[0][i], data[1][i], data[2][i])){
                    winner = data[0][i]
                }
            }
            //斜
            if(equals3(data[0][0], data[1][1], data[2][2])){
                    winner = data[0][0]
            }

            if(equals3(data[2][0], data[1][1], data[0][2])){
                    winner = data[2][0]
            }

            let openspots = 0
            for(let a = 0; a < 3; a++){
                for(let b = 0; b < 3; b++){
                    if(data[a][b] == 0){
                        openspots++
                    }
                }
            }
            
            if(winner == null && openspots == 0){
                return 'tie'
            } else {
                return winner
            }

        }

        function minMax(data, depth, isMaximizing){

            let result = checkWinner(data)
            if(result !== null){
                if(result == 2) return 1
                if(result == 1) return -1
                if(result == 'tie') return 0
            }

            if(isMaximizing){
                let bestScore = -2
                for(let a = 0; a < 3; a++){
                    for(let b = 0; b < 3; b++){
                        if(data[a][b] == 0){
                            let cop = clone(data)
                            cop[a][b] = 2
                            let score = minMax(cop, depth + 1, false)
                            bestScore = Math.max(score,bestScore)
                            if(bestScore === score && depth == 0){
                                arr.x = a
                                arr.y = b
                            }

                        }
                    }
                }
                return bestScore
            } else {
                let bestScore = 2
                for(let a = 0; a < 3; a++){
                    for(let b = 0; b < 3; b++){
                        if(data[a][b] == 0){
                            let cop = clone(data)
                            cop[a][b] = 1
                            let score = minMax(cop, depth + 1, true)
                            bestScore = Math.min(score,bestScore)
                        }
                    }
                }
                return bestScore
            }
        }

        document.querySelector('.reset').addEventListener('click',function(){
            if(document.querySelector('.first').innerText == "player first"){
                data = [[2, 0, 0],[0, 0, 0],[0, 0, 0]]
                init()
            } else {
                data = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
                init()
            }
            document.querySelector('.tips').innerHTML = ''
            init()
        })

        document.querySelector('.first').addEventListener('click', function(e){
            if(e.target.innerText == "robot first"){
                document.querySelector('.first').innerText = 'player first'
                data = [[2, 0, 0],[0, 0, 0],[0, 0, 0]]
                init()
            } else {
                document.querySelector('.first').innerText = 'robot first'
                data = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
                init()
            }
        })
        init()