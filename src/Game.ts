export class Game {
    private lastPlayer: string = ' ';
    private _board: Board = new Board();

    public Play(player: string, x: number, y: number) : void {

        this.validatePlayer(player);
        this.validatePosition(x, y);
        // update game state
        this.lastPlayer = player;
        this._board.AddTileAt(player, x, y);
    }

    private validatePlayer(player: string) {
        //if first move
        if (this.lastPlayer == ' ') {
            //if player is X
            if (player == 'O') {
                throw new Error("Invalid first player");
            }
        }
        //if not first move but player repeated
        else if (player == this.lastPlayer) {
            throw new Error("Invalid next player");
        }
    }

    private validatePosition(x: number, y: number) {
        //if not first move but play on an already played tile
        if (this._board.TileAt(x, y).Symbol != ' ') {
            throw new Error("Invalid position");
        }
    }

    public Winner() : string {
        
        for (let i = 0; i < 3; i++){
            if (this.allPositionsInRowTaken(i)) {
                if (this.checkIfRowContainsSameSymbol(i)) {
                    return this.getSymbolAtPosition(i,0);
                }
            } 
        }
        return ' ';
    }

    private checkIfRowContainsSameSymbol(row:number) : boolean{
        return this.getSymbolAtPosition(row, 0) == this.getSymbolAtPosition(row, 1) &&
            this.getSymbolAtPosition(row, 2) == this.getSymbolAtPosition(row, 1);
    }

    private getSymbolAtPosition(row: number, column: number) {
        return this._board.symbolAtPosition(row,column);
    }

    private allPositionsInRowTaken(row:number) {
        return this.positionIsEmpty(row, 0) &&
            this.positionIsEmpty(row, 1) &&
            this.positionIsEmpty(row, 2);
    }

    private positionIsEmpty(x:number,y:number) {
        return this._board.TileAt(x,y)!.Symbol != ' ';
    }
}

interface Tile
{
    X: number;
    Y: number;
    Symbol: string;
}


class Board
{
    private _plays : Tile[] = [];
    private numberOfRows : number = 3;
    private numberOfColumns : number = 3;

    constructor()
    {
        for (let i = 0; i < this.numberOfRows; i++)
        {
            for (let j = 0; j < this.numberOfColumns; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

    public getNumberOfColumns(): number {
        return this.numberOfColumns;
    }

    public symbolAtPosition(row:  number, column: number): string {
        return this._plays.find((t:Tile) => t.X == row && t.Y == column)!.Symbol;
    }

    public AddTileAt(symbol: string, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};
        this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}