/*
Plan:
	* div for board, includes margins
	* (board image contained in div,
	   how do we determine squares
	   positioning?)
	* table set in board, one td per square
	* (table must be absolutely positioned?)
	* use trick like this to choose img 
	  per square:

#sample{
    width:200px;
    height:200px;
    overflow:hidden;
    position: relative;
    border: 1px solid black;
}

#sample img {
    position: absolute;
    top: 50px;
    left: -10px;
    width: auto;
    height: auto;
    //max-width: 30px;
    max-height: 60px;
}

	* ^ here top & left set image origin,
	  and max-* can set scaling
      since js will have the sizes of the
	  images this might help us get this
      pixel perfect.
	* drag / drop pieces & dispatch actions
	* click & place pieces

*/

/* 144 x 115 */

$(document).ready(function() {
	var sheet_map = {
		piece_size: [115, 144],
		img_size: [2*115, 8*144],
		img_src: "img/shogi-pieces-1.png",
		pieces: {
			B: [0, 2*144],
			G: [0, 3*144],
			K: [0, 0*144],
			L: [0, 6*144],
			N: [0, 5*144],
			P: [0, 7*144],
			R: [0, 1*144],
			S: [0, 4*144]
		}
	};
	var START_POSITION = {
		P1: ["P", 7, 1],
		P2: ["P", 7, 2],
		P3: ["P", 7, 3],
		P4: ["P", 7, 4],
		P5: ["P", 7, 5],
		P6: ["P", 7, 6],
		P7: ["P", 7, 7],
		P8: ["P", 7, 8],
		P9: ["P", 7, 9],
		B:  ["B", 8, 2],
		R:  ["R", 8, 8],
		L1: ["L", 9, 1],
		N2: ["N", 9, 2],
		S3: ["S", 9, 3],
		G4: ["G", 9, 4],
		K:  ["K", 9, 5],
		G6: ["G", 9, 6],
		S7: ["S", 9, 7],
		N8: ["N", 9, 8],
		L9: ["L", 9, 9]
	};
	function add_piece(piece_name, piece_id, square) {
		var width_ratio = square.width() / sheet_map.piece_size[0];
		var height_ratio = square.height() / sheet_map.piece_size[1];
		var ratio = Math.min(width_ratio, height_ratio);
		square.html(
			'<div class="piece" id="'
			+ piece_id
			+ '" style="min-width: ' 
			+ (sheet_map.piece_size[0] * ratio)
			+ 'px; min-height: '
			+ (sheet_map.piece_size[1] * ratio)
			+ 'px;"><img src="'
			+ sheet_map.img_src
			+ '" style="left: '
			+ (-sheet_map.pieces[piece_name][0] * ratio)
			+ 'px; top: '
			+ (-sheet_map.pieces[piece_name][1] * ratio)
			+ 'px; max-width: '
			+ (sheet_map.img_size[0] * ratio)
			+ 'px;"></div>'
		);
		console.log("asdffsd");
	};
	function get_square(row, column) {
		var index = ((row-1) * 9 + column);
		return $(".squares li:nth-child(" + index + ")");
	};
	function display_position(position) {
		Object.keys(position).forEach(function(k) {
			var data = position[k];
			add_piece(data[0], k, get_square(data[1], data[2]));
    	});
	}
	display_position(START_POSITION);	
});

