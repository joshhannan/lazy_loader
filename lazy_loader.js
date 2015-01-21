(function($) {
	$.fn.lazy_loader = function( options ) {
		var products, product_length, item_count, row_counter, product_html, product;
		var full_item_counter = 0;
		var settings = $.extend({
			url:  'http://localhost/~webdesigner/ariva/products_json.php',
			json: 'true',
			load_html: '<div class="row block"><img class="loading" style="position: absolute; left: 50%; margin: 0 0 0 -16px; top: 150px;" src="images/loading.gif" /></div>',
			wrapper: {
				selector: '.row',
				element_classes: 'row block',
				items_in_wrapper: 3,
				wrappers_to_load: 2
			},
			item: {
				selector: '.item',
				item_classes: 'item left third'
			}
		}, options );

		var obj = $(this);

		function formatItems(obj) {
			var keyname = [ ];
			var value = "";
			for (var p in obj) {
				if( obj.hasOwnProperty(p) ) {

				}
			}
			return keyname;
		}

		function construct_element( element_type, classes, url ) {
			switch( element_type ) {
				case 'image' :
					return '<'+element_type+' src="'+url+'" />';
				case 'anchor' :
					return '<'+element_type+' href="'+url+'"></'+element_type+'>';
				default:
					return '<'+element_type+'></'+element_type+'>';
			}
			return html;
		}

		if( $(this).data('wrapper') ) {
			var wrapper = $(this).data('wrapper');
			wrapper = $(wrapper);
		}
		if( $(this).data('item') ) {
			var item = $(this).data('item');
			item = $(item);
		}

		/*
			get hardcoded item
		function construct_item(wrapper, item) {
			var item_html = $(wrapper).html();
			return item_html;
		}
		var item_html = construct_item( settings.wrapper.selector, settings.item.selector );
		console.log(item_html);
		*/
		$(this).each(function() {
			if( settings.json == 'true' ) {
				$.getJSON( settings.url, function(items) {
					total_items = items.length;
					total_items = parseInt(total_items)-parseInt(1);
					item_counter = 0;
					if( $('.ajax_counter').length > 0 ) {

						all_item_counter = $('.ajax_counter').data('item-count');
						row_counter = $('.ajax_counter').data('row-count');
					} else {
						all_item_counter = 0;
						row_counter = 0;
					}
					for( r = 0; r < settings.wrapper.wrappers_to_load; r++ ) {
						for( i = 0; i < settings.wrapper.items_in_wrapper; i++ ) {
							if( all_item_counter <= total_items ) {
								console.log(all_item_counter+' '+total_items);
								item_counter++;
								if( item_counter == 1 ) {
									row_counter++;
									var row_id = 'row_'+row_counter;
									obj.append('<div id="'+row_id+'" class="'+settings.wrapper.element_classes+'"></div>');
								}
								cur_item = items[all_item_counter];
								if( cur_item['best_seller'] == 1 && cur_item['new_arrival'] == 1 ) {
									specials = '<span class="special best_seller">Best Seller</span><span class="special new_arrival top">New</span>';
								} else if( cur_item['best_seller'] == 1 && cur_item['new_arrival'] == 0 ) {
									specials = '<span class="special best_seller">Best Seller</span>';
								} else if( cur_item['best_seller'] == 0 && cur_item['new_arrival'] == 1 ) {
									specials = '<span class="special new_arrival">New</span>';
								} else {
									specials = '';
								}
								// build item
								item_html = '<div id="item_'+cur_item['id']+'" class="item left third"><a class="image block" href="product-detail.php"><img alt="'+cur_item['title']+'" src="'+cur_item['image']+'" /></a><div class="info block">'+specials+'<h3><a href="product-detail.php">'+cur_item['title']+'</a></h3><p class="price">$'+cur_item['price']+'</p></div></div>';

								// last thing to do
								$('#'+row_id).append(item_html);
								item_html = '';
								all_item_counter++;
								if( item_counter == settings.wrapper.items_in_wrapper ) { item_counter = 0; }
							} else {
								if( obj.find('p.done').length > 0 ) {
									return false;
								} else {
									obj.append('<p class="done">No More to Display.</p>');
									return false;
								}
							}
						}
					}
					if( $('.featured_items.block').find('.ajax_counter').length > 0 ) {
						var new_item_count = all_item_counter;
						var new_row_count = row_counter;
						$('.featured_items.block .ajax_counter').data('row-count', new_row_count);
						$('.featured_items.block .ajax_counter').data('item-count', new_item_count);
					} else {
						$('.featured_items.block').prepend('<span style="display: none;" class="ajax_counter" data-row-count="'+row_counter+'" data-item-count="'+all_item_counter+'"></span>');
						$('.featured_items.block').find(wrapper).first().hide();
					}
					$('.featured_items.block').find('img.loading').remove();
					return false;
				}).fail(function(jqXHR, textStatus, errorThrown) {
					console.log("error " + textStatus);
					console.log("incoming Text " + jqXHR.responseText);
				});
			} else {
				// Brandon's AJAX call on Gelus.  Would be a static AJAX call to a .php file.  for reference.
				/*
				var num = 0,
				$recipeArea = $("#recipe-area");
				$("#load-more .sq-btn").on("click", function(e) {
					e.preventDefault();
					num++;
					$recipeArea.addClass("loading");
					$.get("recipe" + num + ".php", function(data) {
						var recipeItems = $(data).find('#recipe-items').html();
						$("#recipe-area").append(recipeItems);
						$recipeArea.removeClass("loading");
						// Clear Events Handlers for current more links (prevent double-firing)
						// Call recipeMore() function for new recipes
						$(".more-link").off();
						recipeMore();
					}).fail(function() {
						$("#load-more").prepend("<h4>All Recipes are Loaded</h4>");
						$("#load-more .sq-btn").remove();
						$recipeArea.removeClass("loading");
					});
				});
				*/
			}
		});
		return this;
	}; //  END LAZY LOADER FUNCTION
}(jQuery));