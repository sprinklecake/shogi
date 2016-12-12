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
		MP1: ["P", 7, 1, "my"],
		MP2: ["P", 7, 2, "my"],
		MP3: ["P", 7, 3, "my"],
		MP4: ["P", 7, 4, "my"],
		MP5: ["P", 7, 5, "my"],
		MP6: ["P", 7, 6, "my"],
		MP7: ["P", 7, 7, "my"],
		MP8: ["P", 7, 8, "my"],
		MP9: ["P", 7, 9, "my"],
		MB:  ["B", 8, 2, "my"],
		MR:  ["R", 8, 8, "my"],
		ML1: ["L", 9, 1, "my"],
		MN2: ["N", 9, 2, "my"],
		MS3: ["S", 9, 3, "my"],
		MG4: ["G", 9, 4, "my"],
		MK:  ["K", 9, 5, "my"],
		MG6: ["G", 9, 6, "my"],
		MS7: ["S", 9, 7, "my"],
		MN8: ["N", 9, 8, "my"],
		ML9: ["L", 9, 9, "my"],
		TP1: ["P", 3, 1, "their"],
		TP2: ["P", 3, 2, "their"],
		TP3: ["P", 3, 3, "their"],
		TP4: ["P", 3, 4, "their"],
		TP5: ["P", 3, 5, "their"],
		TP6: ["P", 3, 6, "their"],
		TP7: ["P", 3, 7, "their"],
		TP8: ["P", 3, 8, "their"],
		TP9: ["P", 3, 9, "their"],
		TB:  ["B", 2, 8, "their"],
		TR:  ["R", 2, 2, "their"],
		TL1: ["L", 1, 1, "their"],
		TN2: ["N", 1, 2, "their"],
		TS3: ["S", 1, 3, "their"],
		TG4: ["G", 1, 4, "their"],
		TK:  ["K", 1, 5, "their"],
		TG6: ["G", 1, 6, "their"],
		TS7: ["S", 1, 7, "their"],
		TN8: ["N", 1, 8, "their"],
		TL9: ["L", 1, 9, "their"],
	};
	function put_piece(piece_id, piece_type, owner, square) {
		var width_ratio = square.width() / sheet_map.piece_size[0];
		var height_ratio = square.height() / sheet_map.piece_size[1];
		var ratio = Math.min(width_ratio, height_ratio);
		$("#" + piece_id).remove();
		square.html(
			'<div class="'
			+ owner
			+ ' piece" id="'
			+ piece_id
			+ '" data-piece-type="'
			+ piece_type
			+ '" style="min-width: ' 
			+ (sheet_map.piece_size[0] * ratio)
			+ 'px; min-height: '
			+ (sheet_map.piece_size[1] * ratio)
			+ 'px;" draggable="'
			+ (owner == "my" ? "true" : "false")
			+ '"><img src="'
			+ sheet_map.img_src
			+ '" style="left: '
			+ (-sheet_map.pieces[piece_type][0] * ratio)
			+ 'px; top: '
			+ (-sheet_map.pieces[piece_type][1] * ratio)
			+ 'px; max-width: '
			+ (sheet_map.img_size[0] * ratio)
			+ 'px;" draggable="false"></div>'
		);
		/* this awful hack is probably not portable lol */
		$("#" + piece_id).on("dragstart", function(ev) {
			var dt = ev.originalEvent.dataTransfer;
			dt.setData("text/plain", 
				ev.target.id 
				+ " " 
				+ ev.target.dataset.pieceType 
			);
			if (dt.setDragImage) {
				dt.setDragImage(ev.target, 
					(sheet_map.pieces[piece_type][0] 
						+ sheet_map.piece_size[0] / 2) * ratio,
					(sheet_map.pieces[piece_type][1]
						+ sheet_map.piece_size[1] / 2) * ratio
				);
			}
		});
	};
	function get_square(row, column) {
		var index = ((row-1) * 9 + column);
		return $(".squares li:nth-child(" + index + ")");
	};
	function display_position(position) {
		Object.keys(position).forEach(function(k) {
			var data = position[k];
			put_piece(k, data[0], data[3], get_square(data[1], data[2]));
    	});
	}
	display_position(START_POSITION);
	$(".squares li")
		.on("dragover", false)
		.on("drop", function(ev) {
		var dt = ev.originalEvent.dataTransfer;
		var data = dt.getData("text/plain").split(" ");
		put_piece(data[0], data[1], "my", $(this));
	});
});

