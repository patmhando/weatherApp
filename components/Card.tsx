const Card = (props: any) => {
  const classes = 'px-6 py-2 bg-gray-500 rounded' + props.className;
  return <div className={classes}>{props.children}</div>;
};
export default Card;
