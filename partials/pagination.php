<?php
if( get_next_posts_link() || get_previous_posts_link() ) {
?>
  <!-- post pagination -->
  <nav id="pagination" class="container">
    <div class="row">
      <div class="col col12 u-align-center">
<?php
$next = get_next_posts_link('Older');
if ($next) {
  echo $next;
}
?>
      </div>
    </div>
  </nav>
  <div class="loading-more hidden"><img src="<?php bloginfo('stylesheet_directory'); ?>/img/preloader.gif"></div>
<?php
}
?>
