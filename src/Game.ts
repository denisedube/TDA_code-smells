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
        //if the positions in first row are taken
        if (this.isRowEmpty(0)) {
            //if first row is full with same symbol
            if (this._board.TileAt(0, 0)!.Symbol ==
                    this._board.TileAt(0, 1)!.Symbol &&
                    this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol) {
                return this._board.TileAt(0, 0)!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this.isRowEmpty(1)) {
            //if middle row is full with same symbol
            if (this._board.TileAt(1, 0)!.Symbol ==
                    this._board.TileAt(1, 1)!.Symbol &&
                    this._board.TileAt(1, 2)!.Symbol ==
                            this._board.TileAt(1, 1)!.Symbol) {
                return this._board.TileAt(1, 0)!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this.isRowEmpty(2)) {
            //if middle row is full with same symbol
            if (this._board.TileAt(2, 0)!.Symbol ==
                    this._board.TileAt(2, 1)!.Symbol &&
                    this._board.TileAt(2, 2)!.Symbol ==
                            this._board.TileAt(2, 1)!.Symbol) {
                return this._board.TileAt(2, 0)!.Symbol;
            }
        }

        return ' ';
    }

    private isRowEmpty(row:number) {
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

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x:  number, y: number): Tile {
        return this._plays.find((t:Tile) => t.X == x && t.Y == y)!
    }

    public AddTileAt(symbol: string, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}