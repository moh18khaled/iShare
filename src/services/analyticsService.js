import * as tf from '@tensorflow/tfjs';

export class AnalyticsService {
  static async analyzeTrends(historicalData) {
    try {
      // Prepare data
      const values = historicalData.map(d => d.value);
      const tensor = tf.tensor1d(values);
      
      // Calculate basic statistics
      const mean = tensor.mean();
      const std = tensor.std();
      const min = tensor.min();
      const max = tensor.max();
      
      // Simple trend analysis
      const trend = values[values.length - 1] > values[0] ? 'Upward' : 'Downward';
      
      // Calculate growth rate
      const growthRate = ((values[values.length - 1] - values[0]) / values[0]) * 100;
      
      return {
        trend,
        statistics: {
          mean: await mean.data(),
          std: await std.data(),
          min: await min.data(),
          max: await max.data(),
          growthRate: growthRate.toFixed(2)
        }
      };
    } catch (error) {
      console.error('Error in trend analysis:', error);
      throw error;
    }
  }

  static predictFutureValue(historicalData) {
    try {
      const values = historicalData.map(d => d.value);
      const lastValue = values[values.length - 1];
      const average = values.reduce((a, b) => a + b, 0) / values.length;
      const trend = values[values.length - 1] - values[values.length - 2];
      
      // Simple prediction based on trend and average
      const prediction = lastValue + trend;
      const confidence = 1 - Math.abs(prediction - average) / average;
      
      return {
        predictedValue: prediction.toFixed(2),
        confidence: (confidence * 100).toFixed(2)
      };
    } catch (error) {
      console.error('Error in prediction:', error);
      throw error;
    }
  }

  static analyzeEngagement(engagementData) {
    try {
      const total = Object.values(engagementData).reduce((a, b) => a + b, 0);
      const analysis = {};
      
      for (const [key, value] of Object.entries(engagementData)) {
        analysis[key] = {
          percentage: ((value / total) * 100).toFixed(2),
          value
        };
      }
      
      return analysis;
    } catch (error) {
      console.error('Error in engagement analysis:', error);
      throw error;
    }
  }
}