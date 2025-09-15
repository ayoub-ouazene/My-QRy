
import "../Features.tsx"
import {motion} from "framer-motion"

type MyComponentProps = {
  pic: number;
  title: string;
  description: string;
};


const Feature: React.FC<MyComponentProps> = ({pic,title,description}) => {
  return (
    <motion.div className="Feature"
    initial={{opacity:0 , x:-200}}
    whileInView={{opacity:1,x:0}}
    transition={{duration:0.6}}
    >
      <div className={pic==1?"img1":(pic==2)?"img2":"img3"} ></div>
      <h4>{title}</h4>
      <p>{description}</p>

    </motion.div>
  )
}


export default Feature 