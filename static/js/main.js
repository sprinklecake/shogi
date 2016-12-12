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
			p: [0, 7*144]
		}
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
	}
	for (var i=0; i < 9; ++i) {
		add_piece('p', 'p' + (i+1), 
			$(".squares li:nth-child(" + (6*9 + i + 1) + ")"));
	}
});

