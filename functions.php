<?php
function scripts_and_styles_method() {

  $templateuri = get_template_directory_uri() . '/js/';

  // library.js is to bundle plugins. my.js is your scripts. enqueue more files as needed
  $jslib = $templateuri."library.js";
  wp_enqueue_script( 'jslib', $jslib,'','',true);
  $myscripts = $templateuri."main.js";
  wp_enqueue_script( 'myscripts', $myscripts,'','',true);

  // enqueue stylesheet here. file does not exist until stylus file is processed
  wp_enqueue_style( 'site', get_stylesheet_directory_uri() . '/css/site.css' );

  // dashicons for admin
  if(is_admin()){
    wp_enqueue_style( 'dashicons' );
  }

}
add_action('wp_enqueue_scripts', 'scripts_and_styles_method');

if( function_exists( 'add_theme_support' ) ) {
  add_theme_support( 'post-thumbnails' );
}

if( function_exists( 'add_image_size' ) ) {
  add_image_size( 'admin-thumb', 150, 150, false );
  add_image_size( 'opengraph', 1200, 630, true );

  add_image_size( 'index-thumb', 500, 650, false );
  add_image_size( 'single-thumb', 500, 9999, false );
  add_image_size( 'single-full', 1800, 9999, false );
}

// Register Nav Menus

register_nav_menus( array(
	'category_menu' => 'Category Menu',
) );


//get_template_part( 'lib/gallery' );
//get_template_part( 'lib/post-types' );
get_template_part( 'lib/meta-boxes' );
get_template_part( 'lib/theme-options' );

add_action( 'init', 'cmb_initialize_cmb_meta_boxes', 9999 );
function cmb_initialize_cmb_meta_boxes() {
  // Add CMB2 plugin
  if( ! class_exists( 'cmb2_bootstrap_202' ) )
    require_once 'lib/CMB2/init.php';
}

// Disable that freaking admin bar
add_filter('show_admin_bar', '__return_false');

// Turn off version in meta
function no_generator() { return ''; }
add_filter( 'the_generator', 'no_generator' );

// Show thumbnails in admin lists
add_filter('manage_posts_columns', 'new_add_post_thumbnail_column');
function new_add_post_thumbnail_column($cols){
  $cols['new_post_thumb'] = __('Thumbnail');
  return $cols;
}
add_action('manage_posts_custom_column', 'new_display_post_thumbnail_column', 5, 2);
function new_display_post_thumbnail_column($col, $id){
  switch($col){
    case 'new_post_thumb':
    if( function_exists('the_post_thumbnail') ) {
      echo the_post_thumbnail( 'admin-thumb' );
      }
    else
    echo 'Not supported in theme';
    break;
  }
}

// remove automatic <a> links from images in blog
function wpb_imagelink_setup() {
	$image_set = get_option( 'image_default_link_type' );
	if($image_set !== 'none') {
		update_option('image_default_link_type', 'none');
	}
}
add_action('admin_init', 'wpb_imagelink_setup', 10);

// Remove WP Emoji
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// custom login logo
/*
function custom_login_logo() {
  echo '<style type="text/css">h1 a { background-image:url(' . get_bloginfo( 'template_directory' ) . '/images/login-logo.png) !important; background-size:300px auto !important; width:300px !important; }</style>';
}
add_action( 'login_head', 'custom_login_logo' );
*/

function my_id_attribute ($atts, $item, $args) {
  $atts['class'] = 'js-menu-filter';
  $atts['data-target'] = $item->title;
  return $atts;
  }
add_filter('nav_menu_link_attributes', 'my_id_attribute', 3, 10);

// UTILITY FUNCTIONS

// to replace file_get_contents
function url_get_contents($Url) {
  if (!function_exists('curl_init')){
      die('CURL is not installed!');
  }
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $Url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $output = curl_exec($ch);
  curl_close($ch);
  return $output;
}

// get ID of page by slug
function get_id_by_slug($page_slug) {
	$page = get_page_by_path($page_slug);
	if($page) {
		return $page->ID;
	} else {
		return null;
	}
}
// is_single for custom post type
function is_single_type($type, $post) {
  if (get_post_type($post->ID) === $type) {
    return true;
  } else {
    return false;
  }
}

// MOST POSTS PER PAGE ON HOME

function posts_per_page( $query ) {
  if ( $query->is_main_query() ) {
      $query->set( 'posts_per_page', 30 );
  }
}
add_action( 'pre_get_posts', 'posts_per_page' );

// GET VIMEO THUMB AND SET AS THUMBNAIL FOR VIDEO POSTS

function save_vimeo_thumb( $post_id ) {

  // Make sure that there is no thumb
  if ( get_post_thumbnail_id($post_id) ) {
    error_log('Has thumb');
    return;
  }

  // Prevent autosave
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
    return;
  }
  // Check the user's permissions
  if ( !current_user_can( 'edit_post', $post_id ) ) {
    return;
  }
  // OK, it's safe for us to save the data now
  // Make sure that vimeo ID is set
  if ( !isset( $_POST['_igv_vimeo'] ) ) {
    return;
  }
  // Sanitize vimeo ID input
  $vimeo_id = sanitize_text_field( $_POST['_igv_vimeo'] );

  $api_url = 'https://api.vimeo.com/videos/' . $vimeo_id;

  if (!function_exists('curl_init')){
      die('CURL is not installed!');
  }
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $api_url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: bearer a0c52130c00d1382bb992ebc59abc9cf',
    )
  );
  $api_response = json_decode(curl_exec($ch));
  curl_close($ch);

  $largest_thumbnail = end($api_response->pictures->sizes);

  $thumbnail_url = $largest_thumbnail->link;

  // Upload image from url
  $upload_dir = wp_upload_dir();
  // Get the remote image and save to uploads directory
  $img_name = time().'_'.basename( $thumbnail_url );
  $img = wp_remote_get( $thumbnail_url );

  if ( is_wp_error( $img ) ) {
    $error_message = $img->get_error_message();
    add_action( 'admin_notices', array( $this, 'wprthumb_admin_notice' ) );

  } else {
    $img = wp_remote_retrieve_body( $img );
    $fp = fopen( $upload_dir['path'].'/'.$img_name , 'w' );
    fwrite( $fp, $img );
    fclose( $fp );
    $wp_filetype = wp_check_filetype( $img_name , null );
    $attachment = array(
      'post_mime_type' => $wp_filetype['type'],
      'post_title' => preg_replace( '/\.[^.]+$/', '', $img_name ),
      'post_content' => '',
      'post_status' => 'inherit'
    );

    //require for wp_generate_attachment_metadata which generates image related meta-data also creates thumbs
    require_once ABSPATH . 'wp-admin/includes/image.php';
    $attach_id = wp_insert_attachment( $attachment, $upload_dir['path'].'/'.$img_name, $post_id );

    //Generate post thumbnail of different sizes.
    $attach_data = wp_generate_attachment_metadata( $attach_id , $upload_dir['path'].'/'.$img_name );
    wp_update_attachment_metadata( $attach_id,  $attach_data );

    //Set as featured image.
    delete_post_meta( $post_id, '_thumbnail_id' );
    add_post_meta( $post_id , '_thumbnail_id' , $attach_id, true );
  }
}
add_action( 'save_post', 'save_vimeo_thumb' );

?>
