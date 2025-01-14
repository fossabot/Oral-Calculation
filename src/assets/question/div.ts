import type { QuestionProvider, Dependency, Question, QuestionModule } from './index';

const enum Divisible {
  Always = 0,
  Fraction = 1,
  QuoRem = 2,
}

class MultiplyQuestionProvider implements QuestionProvider {
  private dep: Dependency;
  public digits1: number;
  public digits2: number;
  public divisible: Divisible;
  constructor(dep: Dependency, params: string) {
    const paramArr = params.split(",");
    this.dep = dep;
    this.digits1 = parseInt(paramArr[0]);
    this.digits2 = parseInt(paramArr[1]);
    this.divisible = parseInt(paramArr[2]) as Divisible;
    // TODO this should be invalid
    if (this.digits1 < this.digits2)
      [this.digits1, this.digits2] = [this.digits2, this.digits1];
  }

  private get_question_divisible(): Question {
    const { rand_big_int, bigInt, Question } = this.dep;
    while (true) {
      const
        num2 = rand_big_int(this.digits2, { avoidIsOne: true });
    }
  }

  public get_question(): Question {
    // TODO
    const { rand_big_int, bigInt, Question } = this.dep;
    while (true) {
      const
        num1 = rand_big_int(this.digits1),
        num2 = rand_big_int(this.digits2, { avoidIsOne: true }),
        correctAnswer = num1.multiply(num2);
      if (correctAnswer.leq(bigInt[0]))
        continue;
      const problem = `${num1.toString()} × ${num2.toString()} = ?`;
      return new Question(problem, correctAnswer.toString());
    }
  }

  public get_title(): string {
    return `${this.digits1}位数乘${this.digits2}位数`;
  }
}

export default {
  get_provider(bigIntModule: Dependency, params: string): MultiplyQuestionProvider {
    return new MultiplyQuestionProvider(bigIntModule, params);
  },
  paramsConfig: [
    {
      type: 'integer',
      name: "运算项 #1 位数",
      min: 1,
      default: 2,
    },
    {
      type: 'integer',
      name: "运算项 #2 位数",
      min: 1,
      default: 2,
    },
    {
      type: 'integer',
      name: "保证除尽题数(%)",
      min: 0,
      max: 100,
      default: 100,
    },
    {
      type: 'select',
      name: "除不尽的答案表示",
      choices: ["分数(a/b)", "商和余数(a...b)"],
      default: 0,
    }
  ],
} as QuestionModule;

