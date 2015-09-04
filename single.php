<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

    <div class="container">

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
    $images = get_field('gallery');
    $meta = get_post_meta($post->ID);
?>

    <article <?php post_class('single-article'); ?> id="post-<?php the_ID(); ?>">

<?php
    if (!empty($meta['_igv_vimeo'][0])) {
?>
      <div id="single-vimeo-embed">
        <div class="u-video-embed-container">
          <iframe id="vimeo-embed" src="//player.vimeo.com/video/<?php echo $meta['_igv_vimeo'][0]; ?>?badge=0&byline=0&color=FFF&portrait=0&title=0" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
      </div>
<?php
}
    if ($images) {
?>
      <div class="masonry-content">
        <div class="js-masonry-container">
<?php
      $i = 0;
      foreach ($images as $image) {
?>
          <div class="js-masonry-item js-single-masonry-item col u-pointer" style="width: <?php echo mt_rand(15, 37); ?>%; margin-bottom: <?php echo mt_rand(30, 100); ?>px; margin-right: <?php echo mt_rand(20, 50); ?>px;" data-index="<?php echo $i; ?>">
            <img src="<?php echo $image['sizes']['single-thumb']; ?>">
          </div>
<?php
        $i++;
      }
?>
        </div>
      </div>

      <div class="slider-content slider-hidden">
        <div class="slider-wrapper">
          <div class="slider-container cycle-slideshow"
            data-cycle-fx="scrollHorz"
            data-cycle-timeout="0"
            data-cycle-prev=".slider-prev"
            data-cycle-next=".slider-next"
            data-cycle-slides=".slider-item">
<?php
      $i = 0;
      foreach ($images as $image) {
?>
            <div class="slider-item">
              <div class="u-holder">
                <div class="u-held">
                  <img
<?php
        if ($i > 10) {
?>
                  data-src="<?php echo $image['sizes']['single-full']; ?>" class="js-lazyload-slideshow slider-img">
<?php
        } else {
?>
                  src="<?php echo $image['sizes']['single-full']; ?>" class="slider-img">
<?php
        }
?>
                </div>
              </div>
            </div>
<?php
      $i++;
      }
?>
          </div>
          <div class="slider-nav slider-prev u-pointer">
            <div class="u-holder">
              <div class="u-held">
                <span id="rotate">&#9654;</span>
              </div>
            </div>
          </div>
          <div class="slider-nav slider-next u-pointer u-align-right">
            <div class="u-holder">
              <div class="u-held">
                &#9654;
              </div>
            </div>
          </div>
        </div>
      </div>
<?php } ?>

    </article>

<?php
  }
} else {
?>
    <article class="u-alert"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
<?php
} ?>

    </div>
  <!-- end posts -->
  </section>

<!-- end main-content -->

</main>

<?php
get_footer();
?>