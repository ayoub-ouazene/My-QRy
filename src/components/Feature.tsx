
import "../Features.tsx"

type MyComponentProps = {
  pic: number;
  title: string;
  description: string;
};


const Feature: React.FC<MyComponentProps> = ({pic,title,description}) => {
  return (
    <div className="Feature">
      <div className={pic==1?"img1":(pic==2)?"img2":"img3"} ></div>
      <h4>{title}</h4>
      <p>{description}</p>

    </div>
  )
}


export default Feature 