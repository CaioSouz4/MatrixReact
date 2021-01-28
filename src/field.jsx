import React, { useEffect } from 'react';

const style = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "20px", 
    height: "20px",
    backgroundColor: "#c0392b",
    border: "solid 1px #732d26",
}

/* const styleTest = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "20px", 
    height: "20px",
} */

const stylegrama = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "20px", 
    height: "20px",
    backgroundColor: "#27ae60", 
    border: "solid 1px #2d7049",
}

const stylePlayer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "20px", 
    height: "20px",
    backgroundColor: "#74b9ff", 
    border: "solid 1px #2d5a87",
}

const linhaStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    //marginLeft: "15%"
}

const container = {
    width: '250px',
    height: '250px',
    margin: 'auto' 
}

var playerRandomX = Math.floor(Math.random() * 9);
var playerRandomY = Math.floor(Math.random() * 9);
var fieldLength = 10;

const Field = () => {    
    const [playerPosition, setPlayerPosition] = React.useState({x: playerRandomX, y: playerRandomY});
    const [prevPlayerPosition, setPrevPlayerPosition] = React.useState({x: playerRandomX, y: playerRandomY});
    
    const createField = () => {
        const createField = []
        for(var i=0; i <= fieldLength; i++) {
            createField[i] = new Array(10)
            for (var j = 0; j <= fieldLength; j++) {
                createField[i][j] = Math.floor(Math.random() * 9);
            }
        }
        
        for(var k = 0; k<9; k++){
            var a = Math.floor(Math.random() * 9);
            var b = Math.floor(Math.random() * 9);
            createField[a][b] = "*";
        }
        createField[playerPosition.y][playerPosition.x] = "T";
        return createField;
    }

    const [field, setField] = React.useState(createField());
    
    useEffect(() => {
        const newField = [...field];
        newField[playerPosition.y][playerPosition.x] = "T";
        newField[prevPlayerPosition.y][prevPlayerPosition.x] = Math.floor(Math.random() * 9);
        // para apenas pintar o field newField[prevPlayerPosition.y][prevPlayerPosition.x] = "T";

        setField(newField);
        
        document.addEventListener('keydown', moveFoward, false);
        document.addEventListener('keydown', moveBack, false);
        document.addEventListener('keydown', moveUp, false);
        document.addEventListener('keydown', moveDown, false);

        return () => {
          document.removeEventListener('keydown', moveFoward, false);
          document.removeEventListener('keydown', moveBack, false);
          document.removeEventListener('keydown', moveUp, false);
          document.removeEventListener('keydown', moveDown, false);
        }
    },[playerPosition, prevPlayerPosition]);

    

    const collision = (x, y, action) => {
        if(y === 0 && action === "UP" || y === fieldLength && (action === "DOWN")) {
            return true;
        } else if (x === 0 && action === "BACK" || x === fieldLength && (action === "FOWARD")) {   
            return true;
        } else { 
            return false;
        }
    }

    const moveFoward = (e) => {
        e.preventDefault();
        if (e.keyCode === 39) {
            if (!collision(playerPosition.x, playerPosition.y, "FOWARD")) { 
                setPlayerPosition({ y: playerPosition.y, x: playerPosition.x + 1 })
                setPrevPlayerPosition({ y: playerPosition.y, x: playerPosition.x })
            }            
        } 
    }

    const moveBack = (e) => {
        e.preventDefault();
        if (e.keyCode === 37) {
            if (!collision(playerPosition.x, playerPosition.y, "BACK")) { 
                setPlayerPosition({ y: playerPosition.y, x: playerPosition.x - 1 })
                setPrevPlayerPosition({ y: playerPosition.y, x: playerPosition.x })
            }
        } 
    }

    const moveDown = (e) => {
         e.preventDefault();
        if (e.keyCode === 40) {        
            if (!collision(playerPosition.x, playerPosition.y, "DOWN")) { 
                setPlayerPosition({ y: playerPosition.y + 1, x: playerPosition.x })
                setPrevPlayerPosition({ y: playerPosition.y, x: playerPosition.x })
            }
        } 
    }

    const moveUp = (e) => {
         e.preventDefault();
        if (e.keyCode === 38) {    
            if (!collision(playerPosition.x, playerPosition.y, "UP")) { 
                setPlayerPosition({ y: playerPosition.y - 1, x: playerPosition.x })
                setPrevPlayerPosition({ y: playerPosition.y, x: playerPosition.x })
            }    
        } 
    }

    return (
        <div style={container}>
           {/*  {
                field.map( linha => {return(  <div style={linhaStyle}> {linha.map(line => {return ( <div style={styleTest}> {line} </div> )}) }</div>)} )
            }  
            {playerPosition.x}
            {playerPosition.y} */}
           {field.map((linha, index) => {
                return (
                    <div key={index} >
                        <div style={linhaStyle}>
                            {linha.map((bloco, index) => { 
                                if(bloco === "*") {
                                return (
                                        <div key={index} style={style}>
                                        </div> 
                                    )
                                } else if (bloco === "T") {
                                    return (
                                        <div key={index} style={stylePlayer}>
                                        </div> 
                                    )
                                } else {
                                    return (
                                        <div key={index} style={stylegrama}>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )
            })}   
        </div>
        )
       
}

export default Field;