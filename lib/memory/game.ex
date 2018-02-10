defmodule Memory.Game do
    def new do
        %{
            squares: [nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil,nil],
            squaresscored: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
            score: 0,
            turnofa: false,
            clicks: 0,
            flag: false,
            secondflag: false
        }

    end

    def client_view(game) do
        %{
            squares: game.squares,
            squaresscored: game.squaresscored,
            score: game.score,
            turnofa: game.turnofa,
            clicks: game.clicks,
            flag: game.flag,
            secondflag: game.secondflag
        }
    end

    def handleClickByServer(game,i) do
        squares = game.squares
        score = game.score
        clicks = game.clicks
        squaresvalue = ['A','B','A','B','C','C','D','D','E','E','F','F','G','H','H','G']
        squaresscored = game.squaresscored
        turnofa = game.turnofa
        flag = false
        secondflag = false
    
        if(Enum.at(squares,i) == nil) do
            IO.puts("yaha pe hai bhadva")
          clicks = clicks + 1;
          if(!turnofa) do
            squares = List.replace_at(squares,i,<< hd Enum.at(squaresvalue,i) >>)
            turnofa = !turnofa
            secondflag = true
            %{
                squares: squares,
                squaresscored: squaresscored,
                score: score,
                turnofa: turnofa,
                clicks: clicks,
                flag: flag,
                secondflag: secondflag
            }
        
            
          
          else
            squares = List.replace_at(squares,i,<< hd Enum.at(squaresvalue,i) >>)
            values = compareSquare(i,0,flag,score,squaresscored,squares,turnofa)
            squares = values.squares
            squaresscored = values.squaresscored
            flag = values.flag
            score = values.score 
            turnofa = !turnofa
            %{
                squares: squares,
                squaresscored: squaresscored,
                score: score,
                turnofa: turnofa,
                clicks: clicks,
                flag: flag,
                secondflag: secondflag
            }
             
        
          end
        else
          flag = true

            %{    
                squares: squares,
                squaresscored: squaresscored,
                score: score,
                turnofa: turnofa,
                clicks: clicks,
                flag: flag,
                secondflag: secondflag

            }
         
        
        end
          
    end
    def replaceValue(squares,i,value) do
        List.replace_at(squares,i,value)
        
    end
    def getValue(squares,index) do
        Enum.at(squares,index)
    end
    def compareSquare(i,j,flag,score,squaresscored,squares,turnofa) do
        #IO.puts("I is")
        #IO.puts(getValue(squares,i))
        if(j<16) do
            if(j != i)do
                if(getValue(squares,j) == getValue(squares,i) && !getValue(squaresscored,j)) do
                    IO.puts("inside")
                    flag = true
                    squaresscored =  replaceValue(squaresscored,i,true)
                    #IO.puts(getValue(squaresscored,i))
                    squaresscored = replaceValue(squaresscored,j,true)
                    #IO.puts(getValue(squaresscored,j))
                    score = score + 1
                    turnofa = !turnofa
                end
                
            end
            
            compareSquare(i,j+1,flag,score,squaresscored,squares,turnofa)
        else
            IO.puts(getValue(squaresscored,i))
            IO.puts(getValue(squaresscored,j))
            %{
                flag: flag,
                squares: squares,
                squaresscored: squaresscored,
                score: score,
                turnofa: turnofa
            }
        end
    end
    def handleTimeOut(game) do
        squares = game.squares
        squaresscored = game.squaresscored
        score = game.score
        turnofa = game.turnofa
        clicks = game.clicks
        turnofa = game.turnofa
        squares = makenull(0, squares, squaresscored)
        flag = game.flag
        secondflag = game.secondflag
        %{
                
            squares: squares,
            squaresscored: squaresscored, 
            score: score,
            turnofa: turnofa,
            clicks: clicks,
            flag: flag,
            secondflag: secondflag
        }
          
        
    end
    def makenull(m,squares,squaresscored)do
        if(m<16) do
            if(!getValue(squaresscored,m))do
                squares = replaceValue(squares,m,nil)
            end
            makenull(m+1,squares,squaresscored)
        else
            squares
        end
        
    end
    
end