<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">
    <div class="container">
      <div class="row">

<?php
if( have_posts() ) {
?>
        <div class="js-masonry-container">
<?php
  while( have_posts() ) {
    the_post();
    $meta = get_post_meta($post->ID);
?>
          <div class="js-masonry-item feed-item col" style="width: <?php echo mt_rand(15, 37); ?>%; margin-bottom: <?php echo mt_rand(30, 100); ?>px; margin-right: <?php echo mt_rand(20, 50); ?>px;">
            <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
              <a href="<?php the_permalink() ?>" class="ajax-link">
                <div class="feed-item-holder">
                  <div class="feed-item-title">
                    <div class="u-holder">
                      <div class="u-held">
                        <h2 class="u-align-center"><?php the_title(); ?></h2>
                      </div>
                    </div>
                  </div>

<?php
  if (!empty($meta['_igv_webm'][0]) && !empty($meta['_igv_mp4'][0])) {
    $thumb_img = wp_get_attachment_image_src(get_post_thumbnail_id(), 'index-thumb');
?>
                  <video autoplay loop poster="<?php echo $thumb_img[0]; ?>">
                    <source src="<?php echo $meta['_igv_webm'][0]; ?>" type='video/webm'/>
                    <source src="<?php echo $meta['_igv_mp4'][0]; ?>" type='video/mp4'/>
                  </video>
                  <div class="no-video-thumb">
                    <?php the_post_thumbnail( 'index-thumb', 'class=feed-item-img'); ?>
                  </div>
<?php
  } else {
  the_post_thumbnail( 'index-thumb', 'class=feed-item-img');

  }
?>
                </div>
              </a>
            </article>
          </div>

<?php } // END WHILE ?>
        </div>
<?php
} else {
?>
        <div class="col col12">
          <article class="u-alert"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
        </div>

<?php
} ?>

      </div>
    </div>
  <!-- end posts -->
  </section>

  <?php get_template_part('partials/pagination'); ?>
<!-- >>> what we doing about pagination? -->

<!-- end main-content -->

</main>

<?php
get_footer();
?>
